import React, { useCallback, useState } from 'react'
import { productWithVariation, products, ReatailOffers } from '../../types/appProps'

type optionType = {
  value: string,
  label: string,
}

function useFilter(data: productWithVariation[] | undefined, retData: ReatailOffers | undefined) {

  const [filteredProducts, setFilteredProducts] = useState<productWithVariation[] | undefined>([])
  const [filterValue, setFilterValue] = useState<optionType | null>(null)


  const initialProducts = (data: productWithVariation[]) => {
    setFilteredProducts(data)
  }

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase()
    setFilteredProducts(() => {
      const productList = data?.map((product) => {
        const newVariationList = { ...product }.variations.nodes.filter((variation) => variation.name.toLowerCase().includes(searchValue))
        return { ...product, variations: { nodes: newVariationList } }
      })
      return productList
    })
  }

  const filterHandler = useCallback((event: React.ChangeEvent<{}>, value: optionType | null) => {

    value === null && setFilteredProducts(data)

    setFilterValue(value)

    switch (value?.value) {

      case 'inStock': {
        setFilteredProducts(() => {
          const productList = data?.map((product) => {
            const newVariationList = { ...product }.variations.nodes.filter((variation) => variation.stockStatus === 'IN_STOCK')
            return { ...product, variations: { nodes: newVariationList } }
          })
          return productList
        })
        break;
      }
      case 'outOfStock': {
        setFilteredProducts(() => {
          const productList = data?.map((product) => {
            const newVariationList = { ...product }.variations.nodes.filter((variation) => variation.stockStatus === 'OUT_OF_STOCK')
            return { ...product, variations: { nodes: newVariationList } }
          })
          return productList
        }
        )
        break;
      }
      case 'manageStock': {
        setFilteredProducts(() => {
          const productList = data?.map((product) => {
            const newVariationList = { ...product }.variations.nodes.filter((variation) => variation.manageStock === "TRUE")
            return { ...product, variations: { nodes: newVariationList } }
          })
          return productList
        }
        )
        break;
      }
      case 'notManageStock': {
        setFilteredProducts(() => {
          const productList = data?.map((product) => {
            const newVariationList = { ...product }.variations.nodes.filter((variation) => variation.manageStock === null)
            return { ...product, variations: { nodes: newVariationList } }
          })
          return productList
        }
        )
        break;
      }
      case 'notSync': {
        setFilteredProducts(() => {
          const productList = data?.map((product) => {
            const newVariationList = { ...product }.variations.nodes.filter((variation) => variation.stockQuantity !== retData?.offers.find((offer) => offer.externalId == variation.databaseId)?.quantity)
            return { ...product, variations: { nodes: newVariationList } }
          })
          return productList
        }
        )
        break;
      }
    }
  }, [filteredProducts, data])


  return { filterValue, initialProducts, filteredProducts, filterHandler, searchHandler }
}

export default useFilter