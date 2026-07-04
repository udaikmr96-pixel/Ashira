import './globals.css'
import { Providers } from './providers'
import { Playfair_Display, Inter } from 'next/font/google'

const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display', weight: ['400','500','600','700','800'] })
const body = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'Ashira Inn \u2014 Boutique Hotel in Greater Noida | Book Direct & Save',
  description:
    'Ashira Inn is a boutique hotel in Knowledge Park III, Greater Noida. Deluxe rooms, premium suites with bathtub, multi-cuisine restaurant, and warm service. Book direct for the best rates.',
  keywords: 'Ashira Inn, hotel Greater Noida, Knowledge Park hotel, India Expo Mart hotel, Sharda University hotel, Buddh Circuit hotel',
  openGraph: {
    title: 'Ashira Inn \u2014 Boutique Hotel in Greater Noida',
    description: 'Book direct for the best rates. Deluxe, Premium and Bathtub suites.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="font-sans antialiased bg-[#faf7f2] text-[#1a1a1a]">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
