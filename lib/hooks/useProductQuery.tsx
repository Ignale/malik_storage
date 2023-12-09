import { useQuery } from '@apollo/client'
import { ALL_PRODUCTS_QUERY } from '../queries'
import { Dispatch, SetStateAction } from 'react'
import { productWithVariation } from '@/types/appProps'

type Props = {
  setData: Dispatch<SetStateAction<productWithVariation | undefined>>
}

function useProductQuery({setData}: Props) {
    const { loading, data, fetchMore, networkStatus }  = useQuery(ALL_PRODUCTS_QUERY, { variables: { first: 10, last: null, before: null, after: null }, notifyOnNetworkStatusChange: true, fetchPolicy: 'cache-and-network', onCompleted(data) {console.log(data)} })

  return {loading, data, fetchMore, networkStatus}
  
}

export default useProductQuery