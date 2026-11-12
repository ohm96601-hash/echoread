import './globals.css';
export const metadata={title:'EchoRead · 让每一句，都成为你的表达',description:'导入英文，听原音，录音跟读。本地优先的英语学习工具。',manifest:'/manifest.webmanifest',appleWebApp:{capable:true,title:'EchoRead',statusBarStyle:'default'},icons:{apple:'/icon-192.png'}};
export const viewport={width:'device-width',initialScale:1,viewportFit:'cover',themeColor:'#F8F7FC'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
