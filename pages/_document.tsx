import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="malik-brand | Storage" key="desc" />
        <meta property="og:title" content="Storage" />
        <meta
          property="og:description"
          content="This is a convinient way to manage products for malik-brand shop"
        />
        <meta
          property="og:image"
          content="https://malik-brand.com/wp-content/themes/malik-brand-redesign/assets/img/logo_white.png"
        />
        <meta name='theme-color' content='#3b3a48'>

        </meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
