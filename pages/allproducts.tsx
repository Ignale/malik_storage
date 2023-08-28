
import Layout from '@/components/Layout'
import { ALL_PRODUCTS_QUERY } from '../lib/queries'
import { ReatailOffers, DefData } from '../types/appProps'
import { Grid } from '@mui/material'
import ProductTable from '@/components/ProductTable'
import { Skeleton } from 'primereact/skeleton';
import { useQuery } from '@apollo/client'
import { useRef } from 'react'
import { Toast } from 'primereact/toast'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url, {}).then(r => r.json())

const Allproducts = () => {
  const toast = useRef<Toast>(null);
  const { loading, data } = useQuery(ALL_PRODUCTS_QUERY, { variables: { first: 100 } })
  const { data: retData, error: retError } = useSWR<ReatailOffers>('/api/getRetialQuantity', fetcher, {
    refreshInterval: 1000
  })
  const { data: defData, error: defError } = useSWR<DefData[]>('/api/getDefectquantity', fetcher, {
    refreshInterval: 1000
  })

  if (retError && toast.current !== null) {
    toast.current.show({ severity: 'error', summary: 'Ошибка', detail: retError.message, life: 3000 })
  }
  console.log({ data, retData, defData })

  const Sceleton = () => {
    return (
      <>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="mb-3 mt-3">
            <Skeleton shape="rectangle" width="100%" height="80px" />
          </div>
        ))}
      </>
    )
  }
  return (
    <Layout>

      <Toast ref={toast} />

      <Grid container alignItems={'center'} spacing={5}>
        <Grid item xs={12}>

          {loading ? <Sceleton /> : <ProductTable defData={defData} retData={retData} products={data?.products?.nodes} />}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Allproducts;