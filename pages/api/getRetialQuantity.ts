import { NextApiRequest, NextApiResponse } from "next";

export default async function getRetialQuantity(req: NextApiRequest, res: NextApiResponse) {
  try{
    const response = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/inventories?apiKey=${process.env.API_KEY}&limit=250`)
    const data = await response.json()
    return res.status(200).json(data)

  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }

}