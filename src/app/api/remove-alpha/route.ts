import { NextResponse } from 'next/server';
import sharp from 'sharp';

const SUPPORTED_FORMATS = ['png', 'jpeg', 'jpg', 'webp', 'avif', 'tiff'] as const;
type SupportedFormat = typeof SUPPORTED_FORMATS[number];

export async function POST(request: Request) {
  try {
    const { image, filename, targetFormat } = await request.json();

    // 从Base64字符串中提取图片数据
    const base64Data = image.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // 获取图片元数据
    const metadata = await sharp(imageBuffer).metadata();
    const hasAlpha = metadata.hasAlpha;
    const colorSpace = metadata.space;
    const currentFormat = metadata.format as SupportedFormat;

    // 如果没有Alpha通道，直接返回原图
    if (!hasAlpha) {
      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': `image/${currentFormat}`,
          'Content-Disposition': `attachment; filename="${filename}"`,
          'X-Image-Status': 'no-alpha',
          'X-Color-Space': colorSpace || 'unknown',
          'X-Current-Format': currentFormat,
        },
      });
    }

    // 使用sharp处理图片
    let processedImage = sharp(imageBuffer).removeAlpha();

    // 如果指定了目标格式且与当前格式不同，进行转换
    if (targetFormat && targetFormat !== currentFormat) {
      processedImage = processedImage.toFormat(targetFormat as SupportedFormat);
    }

    const buffer = await processedImage.toBuffer();

    // 返回处理后的图片
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': `image/${targetFormat || currentFormat}`,
        'Content-Disposition': `attachment; filename="${filename.replace(/\.[^/.]+$/, '')}.${targetFormat || currentFormat}"`,
        'X-Image-Status': 'alpha-removed',
        'X-Color-Space': colorSpace || 'unknown',
        'X-Current-Format': currentFormat,
      },
    });
  } catch (error) {
    console.error('处理图片时出错:', error);
    return new NextResponse('处理图片时出错', { status: 500 });
  }
} 