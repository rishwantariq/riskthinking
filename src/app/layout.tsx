"use client"
import { darkTheme } from './theme/theme';
import './globals.css'
import { ThemeProvider, CssBaseline } from "@mui/material";
import dynamic from 'next/dynamic';

const DynamicResponsiveAppBar = dynamic(
  () => import('@/components/banners/ResponsiveAppBar'),
  { ssr: false }
);
const DynamicFooter = dynamic(
  () => import('@/components/interactive-items/Footer'),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body style={{background: 'black'}}>
          <DynamicResponsiveAppBar />
          {children}
          <DynamicFooter />

        </body>
      </ThemeProvider>
    </html>
  );
}
