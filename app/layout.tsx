import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import QuestionContextProvider from '@/context/question'
import './globals.css'
import HeaderWrapper from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agnos',
  description: 'KYC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuestionContextProvider>
          <HeaderWrapper />
          {children}
        </QuestionContextProvider>
      </body>
    </html>
  )
}
