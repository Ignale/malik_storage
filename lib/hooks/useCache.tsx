import React from 'react'
import { Key } from "react";
import { client } from '@/lib/client'

function useCache() {
  const updateQuantity = (cacheId: Key | undefined, newQuantity: any | null) => {
    if (!cacheId) return
    client.cache.modify({
      id: client.cache.identify({ __typename: 'ProductVariation', id: cacheId }),
      fields: {
        stockQuantity(stockQuantity) {
          return newQuantity
        }
      },
    })
  }
  const updatePrice = (cacheId: Key | undefined, newPrice: any) => {
    if (!cacheId) return
    client.cache.modify({
      id: client.cache.identify({ __typename: 'ProductVariation', id: cacheId }),
      fields: {
        price(price) {
          return newPrice
        }
      },
    })
  }
  const updateSKU = (cacheId: Key | undefined, newSKU: any) => {
    if (!cacheId) return
    client.cache.modify({
      id: client.cache.identify({ __typename: 'ProductVariation', id: cacheId }),
      fields: {
        sku(sku) {
          return newSKU
        }
      },
    })
  }
  const updateMultipleNodes = (
    cacheId: Key | undefined,
    updates: { [field: string]: any }
  ) => {
    if (!cacheId) return
    client.cache.modify({
      id: client.cache.identify({ __typename: 'ProductVariation', id: cacheId }),
      fields: {
        stockQuantity(existing) {
          return updates.hasOwnProperty('stockQuantity') ? updates.stockQuantity : existing
        },
        price(existing) {
          return updates.hasOwnProperty('price') ? updates.price : existing
        }
      },
    })
  }

  return { updateQuantity, updatePrice, updateMultipleNodes, updateSKU }
}

export default useCache