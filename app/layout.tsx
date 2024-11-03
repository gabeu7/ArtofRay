import { NextThemesProvider } from "@/components/theme/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </NextThemesProvider>
      </body>
    </html>
  );
}