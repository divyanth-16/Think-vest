import { Inter, Romanesco } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "react-day-picker";

<<<<<<< HEAD
const inter = Inter({ subsets: ["latin"] });
=======
const inter= Inter({subsets: ["latin"]})
>>>>>>> e973bd4fa652d5927a64e644e394b40e7b8cb964

export const metadata = {
  title: "ThinkVest",
  description: "Your fund buddy",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
<<<<<<< HEAD
      <html lang="en">
        <body className={`${inter.className} bg-[#0F0F0F] text-white min-h-screen`}>
          <Header />
          {children}
        </body>
      </html>
=======
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Header/> 
        {children}
        <Footer/>
      </body>
    </html>
>>>>>>> e973bd4fa652d5927a64e644e394b40e7b8cb964
    </ClerkProvider>
  );
}
