import type { NextApiRequest, NextApiResponse } from 'next'
import XLSX from 'xlsx'
import {google} from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
import {client} from '../../lib/client'
import {ALL_PRODUCTS_QUERY} from '../../lib/queries'
import stream from 'stream'
import { obejctToExport, productWithVariation } from '@/types/appProps'



export default async function (req: NextApiRequest,res: NextApiResponse) {

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `malikbackups-50592b2b0335.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
}

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
  const driveService = google.drive({ version: "v3", auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,

  });
  return response;
};



    try {
      const { data } = await client.query({
        query: ALL_PRODUCTS_QUERY
      })

      const obejctToExport = [] as obejctToExport

      data.products.nodes.forEach((product: productWithVariation) => product.variations.nodes.forEach((variation) => (obejctToExport.push({ 'Название': variation.name, 'Количество': variation.stockQuantity }))))

      const workBook = XLSX.utils.book_new(); //creating new book in exel sheet

      const workSheet = XLSX.utils.json_to_sheet(obejctToExport) //json_to_sheet method converts array of object to sheet

      XLSX.utils.book_append_sheet(workBook, workSheet, `sheet1`);

      const buffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });

      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(buffer, auth)
      return res.status(200).send(response)

    } catch (error) {
      console.log(error)
      return res.status(500).send(error)

    }

}


