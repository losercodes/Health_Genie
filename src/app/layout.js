import { Inter } from "next/font/google";
import "./globals.css";
import Wagmi from "./wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Health Genie",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
             <Wagmi>
        {children}
        </Wagmi>
    </html>
  );
}
