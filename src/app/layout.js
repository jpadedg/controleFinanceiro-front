'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider, createTheme } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  palette: {
    primary: {
      main: '#299D91'
    },
  },
  typography: {
      h1: {
        fontFamily: [ 'Poppins', 'sans-serif'].join(','),
        fontWeight: '700',
        fontSize: '40px',
        lineHeight: '32px',
        letterSpacing: '0,08em',
      },
      h2: {
        fontSize: '24px',
        fontWeight: '700',
        lineHeight: '28px',
        letterSpacing: '0em',
      },
    },
})

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  )
}
