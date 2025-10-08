"use client"

import Layout from '../../components/Layout'
import { ALL_PRODUCTS_QUERY } from '../../lib/queries'
import { useQuery } from '@apollo/client'
import { ReatailOffers, DefData, products } from '../../types/appProps'
import { Grid } from '@mui/material'
import ProductTable from '@/components/ProductTable'

import { Suspense, useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import useSWR from 'swr'
import MalikPaginator from '@/components/tableTemplates/MalikPaginator'
import Sceleton from '@/components/tableTemplates/Sceleton'




const fetcher = (url: string) => fetch(url, {}).then(r => r.json())

function Page() {

  const [args, setArgs] = useState<{ first: number | null, last: number | null, before: string | null, after: string | null }>({ first: 20, last: null, before: null, after: null })

  // const { products } = client.cache.readQuery({ query: ALL_PRODUCTS_QUERY }) as products;

  // console.log(products);
  const abortController = useRef<AbortController>(new AbortController());

  const { loading, data, fetchMore, networkStatus, updateQuery, } = useQuery(ALL_PRODUCTS_QUERY, { variables: args, notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only', nextFetchPolicy: 'cache-first', context: { fetchOptions: { signal: abortController.current?.signal } } })

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
            <MalikPaginator abortController={abortController} data={data} setArgs={setArgs} fetchMore={fetchMore} />
            <ProductTable loading={loading} defData={defData} retData={retData} tableProducts={data?.products?.edges.map((edge: any) => edge.node)} />

          </>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Page;