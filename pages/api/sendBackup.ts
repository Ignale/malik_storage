import type { NextApiRequest, NextApiResponse } from 'next'
import XLSX from 'xlsx'
import getGoogleDrive from '../../googledrive'
import { GoogleAuth } from 'google-auth-library'
import stream from 'stream'
import { obejctToExport, productWithVariation, retailProduct } from '@/types/appProps'



export default async function (req: NextApiRequest,res: NextApiResponse) {

  const {driveService, auth} = getGoogleDrive()

const uploadToGoogleDrive = async (file: unknown, auth: GoogleAuth) => {
  let bufferStream = new stream.PassThrough()
  bufferStream.end(file)
  const fileMetadata = {
    name: `productsBackup${new Date().toLocaleString('ru-RU', { dateStyle: "medium" })}.xlsx`,
    fields: "id",
    parents: ["15ChxT7xJKkptXOPa1QYMvWj1PXU1kcRK"],
  };

  const media = {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    body: bufferStream // you need to put stream here, not just a buffer
  }
  

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,

  });
  return response;
};

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
      
      console.log(retailData)

      const obejctToExport = [] as obejctToExport

      retailData.products.forEach((product: retailProduct) => product.offers.forEach((offer) => (obejctToExport.push({ 'Название': offer.name, "Артикул": offer.xmlId, 'Количество в CRM': offer.quantity }))))

      const workBook = XLSX.utils.book_new(); //creating new book in exel sheet

      const workSheet = XLSX.utils.json_to_sheet(obejctToExport) //json_to_sheet method converts array of object to sheet

      XLSX.utils.book_append_sheet(workBook, workSheet, `sheet1`);

      const buffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });

      const response = await uploadToGoogleDrive(buffer, auth)
      return res.status(200).send(response)

    } catch (error) {
      console.log(error)
      return res.status(500).send(error)

    }

}


