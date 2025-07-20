import type { NextApiRequest, NextApiResponse } from 'next'
import * as crypto from 'crypto'
import wc from '../../lib/wc'
import Allproducts from '../allproducts'


const api = wc()
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const allProductsIds = JSON.parse(req.body)
  const testArr = [746, 747, 748, 749, 750, 751]
  console.log(allProductsIds)
  const createSKU = async (productId: number, variationIds: number[]) => {
    setTimeout(async () => {
      const SKUs = variationIds.map(id => ({ id, sku: crypto.randomBytes(4).toString('hex').toUpperCase() }))
      try {
        const wooResponse = api.post(`products/${productId}/variations/batch`, { update: SKUs })
        const wooData = await wooResponse
        // console.log(wooData.data.update)
        return wooData.data.update

      } catch (error) {
        // console.log(error)
      }
    }, 1000);

  }

  for (const productId in allProductsIds) {
    const data = await createSKU(Number(productId), allProductsIds[productId])
    console.log(data)
  }

}