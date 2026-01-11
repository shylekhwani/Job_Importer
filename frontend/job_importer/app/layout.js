import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Job Import Admin",
  description: "Import history dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen">
          <header className="border-b bg-white px-6 py-4">
            <h1 className="text-xl font-semibold text-black">
              Job Import Admin
            </h1>
          </header>

          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
