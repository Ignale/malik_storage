import type { NextApiRequest, NextApiResponse } from 'next'
import type { customerToCombine } from '../../types/appProps'
import fs from 'fs'

import clients from '../../clients.json'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const mergedCustomerArray = [] as any[]

  try {
    let pages = 1

    const getCostumerList = async (page: number) => {
      try {
        const response = await fetch(`https://malik-brand.retailcrm.ru/api/v5/customers?limit=100&page=${page}&filter[segment]=with-phone`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'X-API-KEY': `${process.env.API_KEY}`
          },
          method: 'GET',

        })
        const data = await response.json()
        pages = data.pagination.totalPageCount
        mergedCustomerArray.push(...data.customers)
      }
      catch (error) {
        console.log(error)
        return res.status(500).json(error)
      }
    }

    for (let i = 1; i <= pages; i++) {
      await getCostumerList(i)
    }

    fs.writeFile('./clients.json', JSON.stringify(mergedCustomerArray), function (error) {
      if (error) {
        console.log(error)
      }
    })
  }
  catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
  // let uniqueEmails = new Set() as Set<string>

  let uniquePhones = new Set() as Set<string>
  const normalClients: any[] = [];
  //normalize phone numbers
  mergedCustomerArray.forEach((el) => {
    const numbers: string[] = el.phones.map((phone: { number: string }) => phone.number.replace(/[^0-9]/g, ''))
    normalClients.push({ ...el, phones: numbers })
    numbers.forEach((number) => {
      if (number.length === 11) {
        const normilized = number.slice(1)
        uniquePhones.add(normilized)
      }
      if (number.length === 10) {
        uniquePhones.add(number)
      }
    })
  })

  const findResultCustomer = (doubleClients: any[]) => {
    const withName = doubleClients.filter((client) => client.firstName)
    if (withName.length >= 1) {
      return { id: withName[0].id }
    }
    return { id: doubleClients[0].id }
  }
  const doubles: any[] = [];
  const arrayPhones = Array.from(uniquePhones)
  const phoneClients = arrayPhones.forEach((uniquePhone: string) => {
    const doubleClients = normalClients.filter((client) => client.phones.some((phone: string[]) => phone.includes(uniquePhone)))
    if (doubleClients.length > 1) {
      doubles.push({
        resultCustomer: findResultCustomer(doubleClients),
        customers: doubleClients.filter((cl) => cl.id !== findResultCustomer(doubleClients)).map((cl) => ({ id: cl.id }))
      })
    }
  })

  // return res.status(200).json(doubles);

  // mergedCustomerArray.forEach((el) => {
  //   uniqueEmails.add(el.email)
  // })

  // const doubles: customerToCombine[] = []
  // uniqueEmails.forEach((uniqueEmail: string) => {
  //   const doubleClients = mergedCustomerArray.filter((client) => client.email === uniqueEmail)
  //   if (doubleClients.length > 1) {
  //     doubles.push({
  //       resultCustomer: findResultCustomer(doubleClients),
  //       customers: doubleClients.filter((cl) => cl.id !== findResultCustomer(doubleClients)).map((cl) => ({ id: cl.id, email: cl.email }))
  //     })

  //   }

  // })
  const responses: { customer: customerToCombine, status: string }[] = []
  // const delay = (time: number) => {
  //   return new Promise(res => {
  //     setTimeout(res, time)
  //   })
  // }
  const combineCustomers = async (customer: customerToCombine) => {

    try {
      const urlencodedBody = new URLSearchParams()
      urlencodedBody.append('resultCustomer', JSON.stringify(customer.resultCustomer))
      urlencodedBody.append('customers', JSON.stringify(customer.customers))
      const response = await fetch(`https://malik-brand.retailcrm.ru/api/v5/customers/combine?apiKey=${process.env.API_KEY}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlencodedBody
      })
      const data = await response.json()
      responses.push({ customer, status: data })

    } catch (error) {
      return res.status(500).json(error)
    }
  }
  for (let i = 0; i < doubles.length; i++) {
    await combineCustomers(doubles[i])

  }
  return res.status(200).json({ combined: [...responses] })
}