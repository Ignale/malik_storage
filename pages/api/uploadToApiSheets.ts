import { obejctToExport, products, retailProduct, rows } from './../../types/appProps';
import type { NextApiRequest, NextApiResponse } from 'next'
import getGoogleDrive from '../../googledrive'
import { google } from 'googleapis';




export default async function (req: NextApiRequest, res: NextApiResponse) {


  try {

    const data = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/products?` + new URLSearchParams({
      limit: '100'
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'X-API-KEY': `${process.env.API_KEY}`
      },
      method: 'GET',

    })
    const retailData = await data.json()

    let retProduct = retailData.products

    if (retailData.pagination.totalPageCount > 1) {
      const data = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/products?` + new URLSearchParams({
        limit: '100',
        page: '2'
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'X-API-KEY': `${process.env.API_KEY}`
        },
        method: 'GET',

      })
      const retailData = await data.json()
      const mergedList = retProduct.concat(retailData.products)
      retProduct = mergedList
    }

    const sheetObject = [] as rows


    retProduct.forEach((product: retailProduct) => product.offers.forEach((offer, index) => {
      if (offer.name == '12') {
        return
      }
      const groups = new Map
      groups.set(950, 'нули')
      groups.set(949, 'лето')
      groups.set(948, 'демисезон')
      groups.set(947, 'потеплее')
      groups.set(946, 'outlet')

      let groupName = product.groups[0] ? groups.get(product.groups[0].id) : ''

      return (sheetObject.push([offer.name, offer.xmlId, groupName, offer.quantity.toString()]))
    }))

    const { driveService, auth } = getGoogleDrive()
    const sheets = google.sheets({ version: 'v4', auth });
    const responce = await sheets.spreadsheets.values.get({
      spreadsheetId: '1iTuB9QLpGkPsuUxwhuIynRCG5IhTfHdut82QV4i_ZPk',
      range: 'A:C',
    });
    const rows = responce.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }
    sheets.spreadsheets.batchUpdate(
      {
        spreadsheetId: '1iTuB9QLpGkPsuUxwhuIynRCG5IhTfHdut82QV4i_ZPk',
        requestBody: {
          requests: [
            {
              updateCells: {
                rows: sheetObject.map(row => ({
                  values: row.map((value, index, arr) =>
                    index === 3 ? { userEnteredValue: { numberValue: Number(value) } } : { userEnteredValue: { stringValue: value } }
                  )
                })),
                fields: '*',
                start: { sheetId: 543683652, rowIndex: 1, columnIndex: 0 },
              }
            }
          ]
        }

      }

    ).then((data) => res.status(200).send({ success: true, status: 'success', message: 'Данные выгружены в таблицу' }))



    //     const uploadToSheetApi = await fetch("https://api.apispreadsheets.com/data/cb6Zu2tx0RCF9XBY/", {
    //     method: "POST",
    //    	body: JSON.stringify({"data": {"Артикул":"D864B561","Название":"Платье «Асимметрия» - Ванильный, 42-46","Количество в CRM":7,"Количество по инвентаризации":""}, "query": "select * from cb6Zu2tx0RCF9XBY"}),
    //   })
    // if (!uploadToSheetApi.ok) {
    //   throw new Error(uploadToSheetApi.statusText)
    // }
  }
  catch (error) {
    console.log(error)
    res.status(500).send(error)
  }

}