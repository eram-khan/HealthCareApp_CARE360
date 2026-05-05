
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: 'CARE360 - Online Doctor Consultations',
  description: 'Connect with certified healthcare professional online.',
  keywords: 'doctor, consultation, healthcare, telemedicine, online doctor',
  authors: [{ name: 'CARE360' }]
};


export default function RootLayout({
  children


}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        
        <Providers>
          {children}
        </Providers>
      </body>
    </html>);

}