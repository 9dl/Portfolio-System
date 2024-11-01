import { Inter } from "next/font/google";
import "./globals.css";
import {Analytics} from "@vercel/analytics/react";
import CustomCursor from "@/components/ui/CustomCursor";
import AnimatedCursor from "react-animated-cursor";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: 'Terrorist.wiki',
    description: '#1 Portfolio Provider',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark overflow-x-hidden`}>
      <body className={inter.className}>
      {children}
      <Analytics />
      </body>
    </html>
  );
}
