import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Our Restaurant",
  description: "Experience the best dishes from around the world. Enjoy a delightful dining experience with us.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">

      <body className={inter.className}>
        {children}</body>
    
    </html>
    </ClerkProvider>
  );
}
