import { Inter, Romanesco } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "react-day-picker";

const inter= Inter({subsets: ["latin"]})

export const metadata = {
  title: "ThinkVest",
  description: "Your fund buddy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className} bg-black`} 
      >
        <Header/> 
        {children}
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
