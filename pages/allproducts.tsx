
import Layout from '@/components/Layout'
import client from '../lib/apollo-client'
import { ALL_PRODUCTS_QUERY } from '../lib/queries'
import { ReatailOffers, products } from '../types/appProps'
import { SWRConfig } from 'swr'
import { Grid } from '@mui/material'
import ProductTable from '@/components/ProductTable'
import { GetServerSidePropsContext } from 'next'




type AllproductsProps = {
  products: products
  fallback: {
    [key: string]: ReatailOffers
  }
}
const Allproducts = ({ products, fallback }: AllproductsProps) => {
  // const { searchHandler, initialProducts, filterHandler, filteredProducts, filterValue } = useFilter(data, retData)
  return (
    <Layout>
      <Grid container alignItems={'center'} spacing={5}>
        <Grid item xs={12}>
          <SWRConfig value={{ fallback }}>
            <ProductTable products={products.products?.nodes} />
          </SWRConfig>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Allproducts;


export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=59')
  const { data } = await client.query({
    query: ALL_PRODUCTS_QUERY,
  })
  const response = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/inventories?apiKey=${process.env.API_KEY}&limit=250`)
  const retData = await response.json()
  return (
    {
      props: {
        products: data,
        fallback: {
          '/api/getRetialQuantity': retData,
        },
        revalidate: 60,
      }
    }
  )
}