import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { ALL_PRODUCTS_QUERY } from '../lib/queries'
import { useQuery } from '@apollo/client'
import { ReatailOffers, DefData, products } from '../types/appProps'
import { Grid } from '@mui/material'
import ProductTable from '@/components/ProductTable'

import { useRef } from 'react'
import { Toast } from 'primereact/toast'
import useSWR from 'swr'
import MalikPaginator from '@/components/tableTemplates/MalikPaginator'
import Sceleton from '@/components/tableTemplates/Sceleton'



const fetcher = (url: string) => fetch(url, {}).then(r => r.json())

const Allproducts = () => {
  const { loading, data, fetchMore, networkStatus }  = useQuery(ALL_PRODUCTS_QUERY, { variables: { first: 20, last: null, before: null, after: null },notifyOnNetworkStatusChange: true,  fetchPolicy: 'cache-and-network'})

  // useEffect(() => {
  //   console.log(data?.products?.nodes)
  //   const write = async () => {
  //     const writeFile = await fetch('/api/saveLocal', {
  //       method: 'POST',
  //       body: JSON.stringify(data?.products?.nodes)
  //     })
  //     const dataWr = await writeFile.json()
  //   }
  //   if (data?.products?.nodes) {
  //     write()
  //   }

  // }, [loading])


  const toast = useRef<Toast>(null);

  const { data: retData, error: retError } = useSWR<ReatailOffers>('/api/getRetialQuantity', fetcher, {
    refreshInterval: 100000
  })
  const { data: defData, error: defError } = useSWR<DefData[]>('/api/getDefectquantity', fetcher, {
    refreshInterval: 100000
  })

  if (retError && toast.current !== null) {
    toast.current.show({ severity: 'error', summary: 'Ошибка', detail: retError.message, life: 3000 })
  }
  console.log({ data, retData, defData })

  
  return (
    <Layout>
      <Toast ref={toast} />
      <Grid container alignItems={'center'} spacing={5}>
        <Grid item xs={12}>
        
        <>
        <MalikPaginator data={data} fetchMore={fetchMore}/>
              <ProductTable loading = {loading} defData={defData} retData={retData} products={data?.products?.nodes} />
        </>
              
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Allproducts;