'use client';

import { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Download, Info, Loader2, ChevronDown, Archive } from 'lucide-react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useTranslations } from 'next-intl';

// 导入类型和工具函数
import { ProcessedImage, SUPPORTED_FORMATS, SupportedFormat } from '@/lib/types';
import { truncateFilename, formatFileSize } from '@/lib/utils';

export default function ImageUploader() {
  // 使用特定的翻译命名空间
  const tDropzone = useTranslations('dropzone');
  const tProcessing = useTranslations('processing');
  const tGallery = useTranslations('gallery');
  const tDownload = useTranslations('download');
  const tErrors = useTranslations('errors');
  const tImageUploader = useTranslations('imageUploader');
  
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && menuRefs.current[openMenuId] && !menuRefs.current[openMenuId]?.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  // 处理图片
  const processImage = async (file: File): Promise<ProcessedImage> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const dataUrl = e.target?.result as string;
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            // 绘制图像到画布上，使用白色背景
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            
            // 获取图像数据
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            // 检查是否有 Alpha 通道
            let hasAlpha = false;
            for (let i = 3; i < imageData.data.length; i += 4) {
              if (imageData.data[i] < 255) {
                hasAlpha = true;
                break;
              }
            }
            
            // 如果有 Alpha 通道，将其设置为不透明
            if (hasAlpha) {
              for (let i = 3; i < imageData.data.length; i += 4) {
                imageData.data[i] = 255;
              }
              ctx.putImageData(imageData, 0, 0);
            }
            
            // 获取处理后的图像 URL
            const processedUrl = canvas.toDataURL(file.type);
            
            // 获取文件格式
            const format = file.name.split('.').pop()?.toLowerCase() || '';
            
            resolve({
              name: file.name,
              url: processedUrl,
              size: file.size,
              hasAlpha,
              colorSpace: 'RGB', // 简化，假设所有图像都是 RGB
              currentFormat: format,
              dataUrl: processedUrl
            });
          };
          
          img.onerror = () => {
            reject(new Error('Failed to load image'));
          };
          
          img.src = dataUrl;
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  // 转换并下载图片
  const convertAndDownload = async (image: ProcessedImage, targetFormat: string) => {
    try {
      if (!image.dataUrl) {
        throw new Error('Image data URL is missing');
      }
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }
      
      const img = new Image();
      img.src = image.dataUrl;
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image for conversion'));
      });
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      let mimeType: string;
      let fileExtension: string;
      
      switch (targetFormat) {
        case 'png':
          mimeType = 'image/png';
          fileExtension = 'png';
          break;
        case 'jpeg':
        case 'jpg':
          mimeType = 'image/jpeg';
          fileExtension = 'jpg';
          break;
        case 'webp':
          mimeType = 'image/webp';
          fileExtension = 'webp';
          break;
        case 'avif':
          mimeType = 'image/avif';
          fileExtension = 'avif';
          break;
        case 'tiff':
          mimeType = 'image/tiff';
          fileExtension = 'tiff';
          break;
        default:
          mimeType = 'image/png';
          fileExtension = 'png';
      }
      
      const dataUrl = canvas.toDataURL(mimeType);
      
      // 从 dataUrl 创建 Blob
      const byteString = atob(dataUrl.split(',')[1]);
      const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeString });
      
      // 生成新文件名
      const originalName = image.name.substring(0, image.name.lastIndexOf('.')) || image.name;
      const newFilename = `${originalName}.${fileExtension}`;
      
      // 下载文件
      saveAs(blob, newFilename);
      
    } catch (error) {
      console.error('Error converting image:', error);
      alert(tErrors('convertError'));
    }
  };

  // 拖放区域配置
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setProcessing(true);
    
    try {
      const processedImages = await Promise.all(
        acceptedFiles.map(file => processImage(file))
      );
      
      setImages(prev => [...prev, ...processedImages]);
    } catch (error) {
      console.error('Error processing images:', error);
      alert(tErrors('processError'));
    } finally {
      setProcessing(false);
    }
  }, [tErrors]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    }
  });

  // 移除图片
  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  // 下载单个图片
  const downloadImage = async (url: string, filename: string): Promise<Blob> => {
    const response = await fetch(url);
    return await response.blob();
  };

  // 打包下载所有图片
  const downloadAll = async () => {
    if (images.length === 0) return;
    
    setDownloading(true);
    
    try {
      const zip = new JSZip();
      
      for (const image of images) {
        const blob = await downloadImage(image.url, image.name);
        zip.file(image.name, blob);
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'processed_images.zip');
    } catch (error) {
      console.error('Error downloading all images:', error);
      alert(tErrors('downloadError'));
    } finally {
      setDownloading(false);
    }
  };

  // 切换下拉菜单
  const toggleMenu = (imageId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setOpenMenuId(prev => prev === imageId ? null : imageId);
  };

  // 设置菜单引用
  const setMenuRef = (name: string, element: HTMLDivElement | null) => {
    menuRefs.current[name] = element;
  };

  return (
    <div className="w-full space-y-8">
      {/* 拖放区域 */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload className="h-12 w-12 text-gray-400" />
          <p className="text-lg font-medium">
            {isDragActive ? tDropzone('titleActive') : tDropzone('title')}
          </p>
          <p className="text-sm text-gray-500">{tDropzone('supportedFormats')}</p>
        </div>
      </div>

      {/* 处理中提示 */}
      {processing && (
        <div className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-lg">
          <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          <p className="text-blue-700">{tProcessing('status')}</p>
        </div>
      )}

      {/* 图片画廊 */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{tGallery('title')}</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {tGallery('count', { count: images.length })}
              </span>
              <button
                onClick={downloadAll}
                disabled={downloading}
                className="flex items-center space-x-1 px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{tGallery('downloading')}</span>
                  </>
                ) : (
                  <>
                    <Archive className="h-4 w-4" />
                    <span>{tGallery('downloadAll')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={`${image.name}-${index}`}
                className="relative group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* 右上角下载按钮 */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="relative">
                    <button
                      onClick={(e) => toggleMenu(image.name, e)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      title={tDownload('title')}
                    >
                      <Download className="h-5 w-5 text-primary-600" />
                    </button>
                    
                    {openMenuId === image.name && (
                      <div
                        ref={(el) => setMenuRef(image.name, el)}
                        className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-20 p-2 text-sm"
                      >
                        <p className="font-medium mb-1">{tDownload('title')}</p>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            onClick={() => convertAndDownload(image, 'jpg')}
                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                          >
                            JPG
                          </button>
                          <button
                            onClick={() => convertAndDownload(image, 'png')}
                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                          >
                            PNG
                          </button>
                          <button
                            onClick={() => convertAndDownload(image, 'webp')}
                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                          >
                            WEBP
                          </button>
                        </div>
                        <button
                          onClick={() => convertAndDownload(image, image.currentFormat)}
                          className="w-full mt-1 px-2 py-1 text-xs bg-primary-100 hover:bg-primary-200 text-primary-700 rounded transition-colors"
                        >
                          {tDownload('current')} ({image.currentFormat.toUpperCase()})
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 图片容器 */}
                <div 
                  className="aspect-square overflow-hidden bg-gray-100 flex items-center justify-center relative"
                  onMouseEnter={() => setHoveredImageId(image.name)}
                  onMouseLeave={() => setHoveredImageId(null)}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="object-contain w-full h-full"
                  />
                  
                  {/* 悬停时显示的信息 */}
                  {hoveredImageId === image.name && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 text-white transition-opacity duration-200">
                      <div className="space-y-2 text-center">
                        <div>
                          <span className="font-medium">{tGallery('status')}: </span>
                          <span className={image.hasAlpha ? 'text-amber-400' : 'text-green-400'}>
                            {image.hasAlpha ? tGallery('hasAlpha') : tGallery('noAlpha')}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">{tGallery('colorSpace')}: </span>
                          <span>{image.colorSpace}</span>
                        </div>
                        <div>
                          <span className="font-medium">{tGallery('currentFormat')}: </span>
                          <span className="uppercase">{image.currentFormat}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 图片信息 */}
                <div className="p-3 border-t">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-medium" title={image.name}>
                        {truncateFilename(image.name, 20)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(image.size)}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => removeImage(index)}
                      className="p-1 text-gray-500 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                      title={tGallery('remove')}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 