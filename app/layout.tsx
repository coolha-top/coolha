import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { headers } from 'next/headers'
import Provider from '@/app/Provider'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config/Wagmi'
import { Web3ModalProvider } from '@/config/Web3Modal'
import { Lens } from '@/config/Lens'
import Header from "@/components/header/header";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: '%s | VimCord',
    default: 'VimCord',
  },
  description:
    "",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="zh">
      <body className={inter.className}>
        <Provider>
          <Web3ModalProvider initialState={initialState}>
            <Lens>

             <Header/>
             {/* <div className="sm:mt-16"/> */}
                {children}
                <Analytics />
            </Lens>
          </Web3ModalProvider>
        </Provider>

      </body>
    </html>
  );
}
