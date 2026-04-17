import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "NoteHub | Manage Your Thoughts",
  description: "Simple and efficient application for managing personal notes",
  openGraph:{
    title: "NoteHub | Manage Your Thoughts",
    description: "Simple and efficient application for managing personal notes",
    url: 'https://notehub.com',
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: 'NoteHub Preview',
    }
    ],
    type: "website",
  }
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
      <body className={roboto.className}>
        <TanStackProvider>
          <Header></Header>
          <main>
            {children}
            {modal}
          </main>
          <Footer></Footer>
        </TanStackProvider>
      </body>
    </html>
  );
}
