import { baseUrl } from '@/lib/metadata';
import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Metadata } from 'next';
import {
  Work_Sans,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: {
    template: '%s | OS Protocol',
    absolute: 'The Agentic Operating System Protocol',
  },
  metadataBase: baseUrl,
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
