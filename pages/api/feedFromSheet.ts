import { obejctToExport, products, retailProduct, rows } from './../../types/appProps';
import type { NextApiRequest, NextApiResponse } from 'next'
import getGoogleDrive from '../../googledrive'
import {google} from 'googleapis';


export default async function (req: NextApiRequest,res: NextApiResponse) {
  const dataSheet = await fetch('https://api.apispreadsheets.com/data/cb6Zu2tx0RCF9XBY/?dataFormat=matrix')
  const data = await dataSheet.json()
  res.status(200).send(data)
}