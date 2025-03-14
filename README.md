# 图片Alpha通道移除工具

一款简单易用的在线工具，帮助您快速移除图片中的Alpha通道（透明度），保持图片质量不变。

## 功能特点

- 🖼️ 支持多种图片格式：PNG, JPG, JPEG, WEBP
- 🌍 多语言支持：简体中文、繁体中文、英文、日文、韩文
- 🎨 自动移除图片Alpha通道（透明度）
- 💾 支持多种格式导出
- 📦 批量处理和下载

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- next-intl (国际化)
- React Dropzone (文件上传)
- JSZip (文件打包)

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 项目结构

```
src/
├── app/                  # Next.js 应用目录
│   ├── [locale]/         # 国际化路由
│   └── layout.tsx        # 根布局
├── components/           # 组件目录
│   ├── image/            # 图像处理相关组件
│   ├── layout/           # 布局组件
│   └── ui/               # UI 组件
├── config/               # 配置文件
│   └── i18n.ts           # 国际化配置
├── lib/                  # 工具库
│   ├── types.ts          # 类型定义
│   └── utils.ts          # 工具函数
├── messages/             # 国际化消息
│   ├── en.json           # 英文
│   ├── zh-CN.json        # 简体中文
│   ├── zh-TW.json        # 繁体中文
│   ├── ja.json           # 日文
│   └── ko.json           # 韩文
├── middleware.ts         # Next.js 中间件
└── styles/               # 样式文件
    └── globals.css       # 全局样式
```

## 许可证

MIT 