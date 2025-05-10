"use client"
import '@styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { client } from './apollo-client'
import { ApolloProvider } from '@apollo/client'
import AuthProvider from '@/context/authContext'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Motivation Scale',
  description: 'A mindfulness tool to help you understand how your motivation effects your actions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </ApolloProvider>
    </AuthProvider>
  )
}
