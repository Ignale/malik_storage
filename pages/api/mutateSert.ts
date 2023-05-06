import { NextApiRequest, NextApiResponse } from "next";

export default async function mutateSert(req: NextApiRequest, res: NextApiResponse) {

  try{
    const response = await fetch(`https://malik-storage-default-rtdb.firebaseio.com/sertificates.json`, {
      method: "PUT",
      body: req.body
    })
    const data = await response.json()

    console.log(data) 

    return res.status(200).json(data)

  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }

}