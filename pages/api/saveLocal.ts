import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { productWithVariation } from '@/types/appProps'

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const products = JSON.parse(req.body) as productWithVariation[]

  const productToSave = products.map((product) => ({ productId: product.productId, variations: [...product.variations.nodes.map(variation => ({ variationId: variation.databaseId, sku: variation.sku, price: variation.price }))] }))

  const varToSave: {}[] = []

  products.forEach(product => {
    product.variations.nodes.forEach(variation => {
      varToSave.push({
        id: variation.databaseId,
        sku: variation.sku,
        price: variation.price
      })
    })
  })
  // console.log(varToSave)

  fs.writeFile('./variations.json', JSON.stringify(varToSave), function (error) {
    if (error) {
      res.status(400).json('error write the file')
    }
    res.status(200).json({ success: true, message: 'saved successfully' })
  })
  fs.writeFile('./products.json', JSON.stringify(productToSave), function (error) {
    if (error) {
      res.status(400).json('error write the file')
    }
    res.status(200).json({ success: true, message: 'saved successfully' })
  })

}