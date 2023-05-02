
import Layout from '@/components/Layout'
import NewProductForm from '@/components/NewProductForm'
import { Fieldset } from 'primereact/fieldset';
import ImgUpload from '@/components/ImgUpload'
import ImgChoose from '@/components/ImgChoose'
import { useState } from 'react'
import { UploadData } from '@/components/ImgUpload'
import { initializeApollo } from '@/lib/apollo-client'
import { ALL_CVET, ALL_PRODUCTS_CATEGORIES, ALL_SIZES } from '@/lib/queries'
import { WooProductCategory, WooProductAttributes } from '@/types/appProps'
import * as crypto from 'crypto';

type AddnewProps = {
  categories: WooProductCategory
  attributes: WooProductAttributes
  sku: string
}

export default function Addnew({ categories, attributes, sku }: AddnewProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadData[]>([])
  const [showFrom, setShowForm] = useState(false)

  const setImageHandler = (data: UploadData[]) => {
    setUploadedImages(() => data)
  }

  // const setChosenImgsHandler = (data: UploadData[]) => {
  //   setUploadedImages(() => data)
  // }

  return (
    <Layout>
      <h1 className='my-3'>Добавить новое платье</h1>
      <h2 className='my-3'>Сначала выберите изображения</h2>
      <ImgUpload onUpload={setImageHandler} />
      {/* <ImgChoose onChoose={setChosenImgsHandler} /> */}
      <Fieldset className='mt-3' >
        {uploadedImages.length ?
          <p>Добавлено {uploadedImages.length} изображений</p> :
          <p>Изображения не добавлены</p>}
      </Fieldset>
      <NewProductForm categories={categories} sku={sku} attributes={attributes} images={uploadedImages} />
    </Layout>
  )
}

export async function getStaticProps() {
  const client = initializeApollo()
  const { data: all_cvet } = await client.query({
    query: ALL_CVET,
  })
  const { data: all_size } = await client.query({
    query: ALL_SIZES,
  })
  const { data: categories } = await client.query({
    query: ALL_PRODUCTS_CATEGORIES,
  })

  const sku = crypto.randomBytes(4).toString('hex').toUpperCase()




  return (
    {
      props: {
        categories: categories.productCategories.nodes,
        attributes: {
          pa_cvet: all_cvet.allPaCvet.nodes,
          pa_size: all_size.allPaSize.nodes
        },
        sku
      }
    }
  )
}