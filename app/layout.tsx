'use client'
import RootProviders from '@/components/RootProviders'
import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css'
import type { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Storage",
//   description: "This is a convinient way to manage products for malik-brand shop",
//   openGraph: {
//     title: "Storage",
//     description: "This is a convinient way to manage products for malik-brand shop",
//     url: "https://malik-brand.com",
//     siteName: "Storage",
//     images: [
//       {
//         url: "https://malik-brand.com/wp-content/themes/malik-brand-redesign/assets/img/logo_white.png",
//         width: 800,
//         height: 600,
//         alt: "malik-brand",
//         type: "image/png",
//       },
//     ],
//     locale: "ru-RU",
//     type: "website",
//   },
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (

    <html lang="en">
      <body>
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  )
}
