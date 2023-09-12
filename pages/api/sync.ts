import type { NextApiRequest, NextApiResponse } from 'next'
import wc from '../../lib/wc'
 const api = wc()

export default async function(req: NextApiRequest,res: NextApiResponse) {

  
  const arg = JSON.parse(req.body)
  
  const wooData = {
    manage_stock: true,
    stock_quantity: arg.count,
    regular_price: Number(arg.newPrice).toFixed(0).toString()
 }


const retailPrice = JSON.stringify([
  {
  id: Number(arg.retailId),
  xmlId: arg.xmlId,
  prices: [{
    code:  'base',
    price: arg.newPrice, 
    remove: false
  }]
 }
])
 console.log(retailPrice)

  const retailData = JSON.stringify([
    {
      xmlId: arg.xmlId,
      stores: [
        {
          code: "warehouse",
          available: arg.count
        }
      ]
    }
  ]);

  const urlencodedOffers = new URLSearchParams();
  const urlencodedPrice = new URLSearchParams();
  urlencodedOffers.append("offers", retailData);
  urlencodedPrice.append("prices", retailPrice);
  try{
    const wooResponse = await api.put(`products/${arg.productId}/variations/${arg.variationId}`, wooData)
    
    const defResponse = await fetch('https://malik-storage-default-rtdb.firebaseio.com/defects/.json', {
      method: 'PUT',
      body: JSON.stringify(arg.defectData)
    })
    const updatedDefData = defResponse.json()
    // const wooProduct = await api.get(`products/${arg.productId}/variations/${arg.variationId}`)

    const retOffResponse = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/inventories/upload?apiKey=${process.env.API_KEY}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencodedOffers
    })
    const ofMessage = await retOffResponse.text()

    const retPrResponse = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/prices/upload?apiKey=${process.env.API_KEY}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencodedPrice
    })

    const prMessage = await retPrResponse.text()
    // console.log({woo: wooResponse.data, ret: message, def: updatedDefData})
    return res.status(200).json({woo: wooResponse.data, ret: {offer: ofMessage, price: prMessage}, def: updatedDefData})
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
