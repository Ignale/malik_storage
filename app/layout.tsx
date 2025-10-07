'use client'

import RootProviders from '@/components/RootProviders'
import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css'



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
