"use server"
import * as crypto from 'crypto'
import wc from '../lib/wc'

async function createSku(productId: string, varitionIds: string[]) {

  const api = wc()
  const SKUs = varitionIds.map(id => ({ id, sku: crypto.randomBytes(4).toString('hex').toUpperCase() }))

  try {
    const wooResponse = await api.post(`products/${productId}/variations/batch`, { update: SKUs })
    console.log('wooResponse', wooResponse.data.update)
    return wooResponse.data.update
  } catch (error) {
    console.error('[server action] createSku error', error)
    throw error
  }
}

async function getHistory({ sku }: { sku: string }) {

  try {
    const response = await fetch(`https://malik-storage-default-rtdb.firebaseio.com/history/${sku}.json`)
    const data = await response.json()
    return data

  } catch (error) {
    console.log(error)
    return { error }
  }

}


async function checkRetailQuantity({ variationIds }: { variationIds: number[] }) {

  const filter = JSON.stringify({
    limit: 250,
    page: 1,
    offerExternalId: variationIds,
  })
  const urlencodedPrice = new URLSearchParams();

  urlencodedPrice.append("prices", filter);
}


export { createSku, checkRetailQuantity, getHistory }
