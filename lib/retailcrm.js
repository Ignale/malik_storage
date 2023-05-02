import retailcrm from 'retailcrm'

const retApi = retailcrm({
  url: 'https://malik-brand.retailcrm.ru',
  apiKey: process.env.API_KEY
})

export default retApi