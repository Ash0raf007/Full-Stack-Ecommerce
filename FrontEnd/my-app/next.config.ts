import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com', // استبدل هذا باسم النطاق الخاص بك
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com', // استبدل هذا بنطاق آخر إذا لزم الأمر
      },
      // يمكنك إضافة المزيد من الأنماط هنا حسب الحاجة
    ],
  },
};

export default nextConfig;
