import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivek Rautela | Creative Developer, Filmmaker & Designer",
  description: "I craft cinematic digital experiences where storytelling, design, engineering, and motion come together. Premium portfolio of Vivek Rautela.",
  keywords: ["Vivek Rautela", "Creative Technologist", "Filmmaker", "Product Designer", "Full Stack Developer", "UI Engineer"],
  authors: [{ name: "Vivek Rautela" }],
  openGraph: {
    title: "Vivek Rautela | Creative Developer, Filmmaker & Designer",
    description: "I craft cinematic digital experiences where storytelling, design, engineering, and motion come together.",
    url: "https://vivekrautela.com",
    siteName: "Vivek Rautela Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Rautela | Creative Developer & Designer",
    description: "I craft cinematic digital experiences where storytelling, design, engineering, and motion come together.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth antialiased dark`}
    >
      <body className="min-h-screen bg-[#050505] text-[#f8fafc] font-sans selection:bg-[#00d2ff]/20 selection:text-[#00d2ff]">
        {children}
      </body>
    </html>
  );
}
