import type { Metadata } from "next"
import Side from '@/components/Side'

export const metadata: Metadata = {
  title: "Storage",
  description: "This is a convinient way to manage products for malik-brand shop",
  openGraph: {
    title: "Storage",
    description: "This is a convinient way to manage products for malik-brand shop",
    url: "https://malik-brand.com",
    siteName: "Storage",
    images: [
      {
        url: "https://malik-brand.com/wp-content/themes/malik-brand-redesign/assets/img/logo_white.png",
        width: 800,
        height: 600,
        alt: "malik-brand",
        type: "image/png",
      },
    ],
    locale: "ru-RU",
    type: "website",
  },
}

export default function Page() {

  return (
    <>
      <Side />
    </>
  )
}