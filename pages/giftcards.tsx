import Layout from '@/components/Layout'
import Sertificates from '../components/Sertificates'
import { Sertificate } from '@/types/appProps'

type SertificatesProps = {
  sertificates: Sertificate[]
}

export default function Giftcards({ sertificates }: SertificatesProps) {
  return (
    <Layout>
      <Sertificates sertificates={sertificates} />
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://malik-storage-default-rtdb.firebaseio.com/sertificates.json')
  const sertificates = await response.json()
  console.log(sertificates)
  return (
    {
      props: {
        sertificates
      }
    }
  )
}