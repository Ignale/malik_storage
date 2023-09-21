import { obejctToExport, products, retailProduct, rows, row } from './../../types/appProps';
import type { NextApiRequest, NextApiResponse } from 'next'
import prJs from '../../products.json'
import wc from '../../lib/wc'

type exportVariatons = {
  id: number,
  sku: string, 
  stock_quantity: number
}

type shortProducts = {
  productId: number,
  variations: {
    variationId: number,
    sku: string,
  }[]
}[]

export default async function (req: NextApiRequest,res: NextApiResponse) {

   const api = wc()
  const dataSheet = await fetch('https://api.apispreadsheets.com/data/cb6Zu2tx0RCF9XBY/?dataFormat=matrix')
  const data = await dataSheet.json()

  const productsToChange =[] as rows
  data.data.forEach((row: row) => row[2]!=row[3] ? productsToChange.push(row) : null)

  const skuToChange = productsToChange.map(pr => pr[1])
  
  const mapPrs = prJs.map(product => {
    const filteredVar =  product['variations'].filter(variation => skuToChange.includes(variation.sku)); 

    if(filteredVar.length > 0) {
      const newfilteredVar = filteredVar.map((fv:any) => ({id: fv.variationId, sku: fv.sku, stock_quantity: Number(productsToChange.find(pr => pr[1]===fv.sku)?.[3])}))
      return {product: product.productId, variations: newfilteredVar} 
    } else {return}
  })
  const filteredPrs = mapPrs.filter(el => el)

  const updatedProducts = []

  const updateQuantity = async (productId: number, variations: exportVariatons[]) => {
    try{
      const urlencodedOffers = new URLSearchParams()
      const offers = JSON.stringify(variations.map(v => ({xmlId: v.sku, stores: [{code: 'warehouse', available: v.stock_quantity}]})))
       urlencodedOffers.append("offers", offers);

       const retOffResponse = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/inventories/upload?apiKey=${process.env.API_KEY}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencodedOffers
    })
    const ofMessage = await retOffResponse.json()

      const wooResponse = api.post(`products/${productId}/variations/batch`, {update: variations} )
      const wooData = await wooResponse
      // console.log(wooData.data.update)
     return {success: true, woo: wooData.data.update, ret: ofMessage}
    } catch(error) {
      console.log(error)
      return {success: false}
    }
  }

  for(let product of filteredPrs) {
    if(product){
      const data = await updateQuantity(product.product, product.variations)
      if(!data.success) {
        return res.status(500).json('error')
      }
      updatedProducts.push(data)
    }
  }

  return res.status(200).json(updatedProducts)
}