import {Noto_Sans} from 'next/font/google';
import '@/styles/reset.css';
import '@/styles/global.css';
import {PropsWithChildren} from 'react';

const font = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700']
});

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html>
    <body className={font.className}>
    {children}
    </body>
    </html>
  );
}
