import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable'
import wp from '../../lib/wp'

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method !== 'POST') return;

  const api = wp();
  const form = new formidable.IncomingForm({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async(err, fields, files) => {
    if (err) {
      return res.status(400).json({ 
        status: 'Неудача',
        message: "Произошла ошибка при отправлении изображения",
        error: err.message });
  };
    if(!Array.isArray(files.file)) {
      const file = files.file;
      api.media().auth({username: 'malik', password: 'malikmalik'})
      .file((<any>file).filepath)
      .create({
        title: fields.name,
        alt_text: fields.name,
      })
      .then((response) => {
        console.log(response)
        res.status(200).json({
          status: 'Успех!',
          message: "Изображение загружено",
          data: [{
            id: response.id,
            src: response.source_url,
            alt_text: response.alt_text
          }]
        })

      }).catch((err) => {
        res.status(400).json({ 
          status: 'Неудача',
          message: "Произошла ошибка при отправлении изображения",
          error: err.message });
      })
    } else {
      const filesArr = files.file;
      const data: any = [];
      filesArr.forEach((file: any, i: any) => {
        api.media().auth({username: 'malik', password: 'malikmalik'})
      .file(file.filepath)
      .create({
        title: fields.name,
        alt_text: fields.name,
      })
      .then((response) => {
        console.log(response)
        data.push({
          id: response.id,
          src: response.source_url,
          alt_text: response.alt_text
        })
        if(i === filesArr.length - 1) {
          res.status(200).json({
          status: 'Успех!',
          message: "Изображения загружены",
          data
        })}
      }).catch((err) => {
        res.status(400).json({ 
          status: 'Неудача',
          message: "Произошла ошибка при отправлении изображений",
          error: err.message });
      })
      })
    }
  })
}
