import type { NextApiRequest, NextApiResponse } from 'next'
import wc from '../../lib/wc'
import fs from 'fs'
import variationsJson from '../../variations.json'
import { localProduct, localVariation } from '@/types/appProps'
import productsJson from '../../products.json'


const api = wc()

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const products: localProduct[] = productsJson
  const variations: localVariation[] = variationsJson

  const arg = JSON.parse(req.body)

  let retNumberRequests = Math.ceil(variations.length / 250)

  let productToSave = [] as {}[]

  const editBatchWooProducts = async (product: localProduct) => {

    productToSave.push({
      productId: product.productId,
      variations: [...product.variations.map((variation) => ({ ...variation, price: (Number(variation.price) + arg.changePrice).toString() }))]
    })
    const wooData = {
      update: product.variations.map(variation => ({
        id: variation.variationId,
        regular_price: Number(variation.price) + arg.changePrice
      }))
    }
    try {
      const wooResp = await api.post(`products/${product.productId}/variations/batch`, wooData)

      res.status(200).json(wooResp.data)

    }
    catch (error) {
      console.log(error)
    }

  }

  for (let i = 0; i < products.length; i++) {
    await editBatchWooProducts(products[i]);
  }
  const retailPrices = JSON.stringify(variations.map(variation => ({
    xmlId: variation.sku,
    prices: [{
      code: 'base',
      price: (Number(variation.price) + arg.changePrice).toString(),
      remove: false
    }]
  })))

  const urlencodedPrice = new URLSearchParams();

  urlencodedPrice.append("prices", retailPrices);



  const retPrResponse = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/prices/upload?apiKey=${process.env.API_KEY}`, {
    method: req.method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: urlencodedPrice
  })



  fs.writeFile('./products.json', JSON.stringify(productToSave), function (error) {
    if (error) {
      res.status(400).json('error write the file')
    }
    res.status(200).json({ success: true, message: 'saved successfully' })
  })

}