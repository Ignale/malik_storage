'use server'

import wc from '@/lib/wc'
import fs from 'fs/promises'
import variationsJson from '@/variations.json'
import productsJson from '@/products.json'
import { localProduct, localVariation } from '@/types/appProps'

export async function updateWooPrices(prevState: any, formData: FormData) {
  const api = wc()

  const arg = {
    changePrice: Number(formData.get('changePrice'))
  }

  const products: localProduct[] = productsJson
  const variations: localVariation[] = variationsJson

  let productToSave: any[] = []

  const editBatchWooProducts = async (product: localProduct) => {
    productToSave.push({
      productId: product.productId,
      variations: product.variations.map(v => ({
        ...v,
        price: (Number(v.price) + arg.changePrice).toString()
      }))
    })

    const wooData = {
      update: product.variations.map(v => ({
        id: v.variationId,
        regular_price: (Number(v.price) + arg.changePrice).toString()
      }))
    }

    await api.post(`products/${product.productId}/variations/batch`, wooData)
  }

  for (const product of products) {
    await editBatchWooProducts(product)
  }

  const retailPrices = JSON.stringify(variations.map(variation => ({
    xmlId: variation.sku,
    prices: [{
      code: 'base',
      price: (Number(variation.price) + arg.changePrice).toString(),
      remove: false
    }]
  })))

  const urlencodedPrice = new URLSearchParams()
  urlencodedPrice.append("prices", retailPrices)

  await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/prices/upload?apiKey=${process.env.API_KEY}`, {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: urlencodedPrice
  })

  await fs.writeFile('./products.json', JSON.stringify(productToSave))

  return { success: true, message: 'saved successfully' }
}
