import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./lib/Web3Provider";
import { Header } from "./components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoQuest",
  description: "Blockchain powered gamebook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Web3Provider>
          <header><Header /></header>
          <main>{children}</main>
          <footer></footer>
        </Web3Provider>
      </body>
    </html>
  );
}
