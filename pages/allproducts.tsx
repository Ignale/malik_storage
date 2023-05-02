
import Layout from '@/components/Layout'
import { initializeApollo, addApolloState } from '../lib/apollo-client'
import { ALL_PRODUCTS_QUERY } from '../lib/queries'
import { ReatailOffers, products } from '../types/appProps'
import { Grid } from '@mui/material'
import ProductTable from '@/components/ProductTable'
import { Skeleton } from 'primereact/skeleton';
import { useQuery } from '@apollo/client'




type AllproductsProps = {
  products: products
  fallback: {
    [key: string]: ReatailOffers
  }
}
const Allproducts = ({ products, }: AllproductsProps) => {

  const { loading, data } = useQuery(ALL_PRODUCTS_QUERY, { variables: { first: 100 } })
  console.log(data)
  const Sceleton = () => {
    return (
      <>
        {Array.from({ length: 8 }).map((el, i) => (
          <div key={i} className="mb-3 mt-3">
            <Skeleton shape="rectangle" width="100%" height="80px" />
          </div>))}
      </>
    )
  }
  return (
    <Layout>
      <Grid container alignItems={'center'} spacing={5}>
        <Grid item xs={12}>
          {loading ?
            <Sceleton />
            : <ProductTable products={data.products?.nodes} />}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Allproducts;