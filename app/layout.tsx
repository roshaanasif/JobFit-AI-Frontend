import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  ReduxProvider   from "./store/provider";
import AuthInitializer from "./components/auth/authInitializer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jobfit-AI",
  description: "AI-Powered Career Assistant",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <ReduxProvider>
          <AuthInitializer>{children}</AuthInitializer>
        </ReduxProvider>
        </body>
    </html>
  );
}
