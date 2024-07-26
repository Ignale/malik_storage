
import type { NextApiRequest, NextApiResponse } from 'next'
import clients from '../../clients.json'
import * as crypto from 'crypto'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const addedIds = [] as any[]
  const addExternalIds = async (id: number) => {
    try {
      const urlencodedBody = new URLSearchParams()
      urlencodedBody.append('customers', JSON.stringify([{
        id,
        externalId: crypto.randomBytes(4).toString('hex')
      }]))
      const response = await fetch(`https://malik-brand.retailcrm.ru/api/v5/customers/fix-external-ids?apiKey=${process.env.API_KEY}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlencodedBody
      })
      const data = await response.json()
      addedIds.push({
        sended: urlencodedBody,
        status: data
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  for (let i = 0; i < clients.length; i++) {
    await addExternalIds(clients[0].id)
  }
  res.status(200).json(addedIds)
} 