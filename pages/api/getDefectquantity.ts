import { NextApiRequest, NextApiResponse } from "next";

export default async function getDefectquantity(req: NextApiRequest, res: NextApiResponse) {
  try{
    const response = await fetch(`https://malik-storage-default-rtdb.firebaseio.com/defects/.json`)
    const data = await response.json()
    return res.status(200).json(data)

  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }

}