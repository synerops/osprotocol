import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Viewport } from 'next';
import { createBaseMetadata } from '@/lib/metadata';
import {
  Lexend,
  JetBrains_Mono,
  Zain,
} from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

const zain = Zain({
  subsets: ['latin'],
  variable: '--font-zain',
  weight: '400',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata = createBaseMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
    { media: '(prefers-color-scheme: light)', color: '#fff' },
  ],
};
export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${zain.variable} ${jetbrainsMono.variable} ${lexend.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider>{children}</RootProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
