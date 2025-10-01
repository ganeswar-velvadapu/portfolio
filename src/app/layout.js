import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ganeswar Velvadapu",
  description: "Ganeswar Velvadapu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        <link rel="icon" href="/ganeswarv.jpg" />
       
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
