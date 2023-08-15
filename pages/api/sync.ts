import type { NextApiRequest, NextApiResponse } from 'next'
import wc from '../../lib/wc'
import { DefData } from '@/types/appProps'
 const api = wc()

export default async function(req: NextApiRequest,res: NextApiResponse) {

  
  const arg = JSON.parse(req.body)
  
  const wooData = {
    manage_stock: true,
    stock_quantity: arg.count,
 }

  const retailData = JSON.stringify([
    {
      id: arg.retailId,
      stores: [
        {
          code: "warehouse",
          available: arg.count
        }
      ]
    }
  ]);

  const urlencoded = new URLSearchParams();
  urlencoded.append("offers", retailData);
  try{
    const wooResponse = await api.put(`products/${arg.productId}/variations/${arg.variationId}`, wooData)
    
    const defResponse = await fetch('https://malik-storage-default-rtdb.firebaseio.com/defects/.json', {
      method: 'PUT',
      body: JSON.stringify(arg.defectData)
    })
    const updatedDefData = defResponse.json()
    // const wooProduct = await api.get(`products/${arg.productId}/variations/${arg.variationId}`)

    const retResponse = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/inventories/upload?apiKey=${process.env.API_KEY}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencoded
    })
    const message = await retResponse.text()

    console.log({woo: wooResponse.data, ret: message, def: updatedDefData})
    return res.status(200).json({woo: wooResponse.data, ret: message, def: updatedDefData})
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
