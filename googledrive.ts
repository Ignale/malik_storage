import {google} from 'googleapis'
import path from 'path';


export default function getGoogleDrive() {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}../../../../../malikbackups-50592b2b0335.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  const driveService = google.drive({ version: "v3", auth });
  return {driveService, auth}
}