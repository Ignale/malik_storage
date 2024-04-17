import type { NextApiRequest, NextApiResponse } from 'next'
import wc from '../../lib/wc'
import { WooProduct, WooProductVariation } from '@/types/appProps'


 const api = wc()

export default async function (req: NextApiRequest,res: NextApiResponse) {

  const reqBody = req.body
  const wooData: WooProduct = {
    name: reqBody.name,
    type: 'variable',
    images: reqBody.images,
    categories: reqBody.categories,
    manage_stock: true,
    status: 'publish',
    on_sale: reqBody.on_sale,
    date_on_sale_from: reqBody.date_on_sale_from,
    date_on_sale_to: reqBody.date_on_sale_to,
    stock_quantity: reqBody.stock_quantity,
    sku: reqBody.sku,
    price: reqBody.regular_price,
    stock_status: 'instock',
    meta_data: reqBody.meta_data,
    backorders: 'no',
    backorders_allowed: false,
    dimensions: reqBody.dimensions,
    weight: reqBody.weight,
    attributes: reqBody.attributes,
    lang: 'ru',
    variations: [],
    default_attributes: []
  }

  try{
    const wooResponse = await api.post(`products`, wooData)

    const createdProduct = wooResponse.data

    console.log(wooResponse.data)

    const variations = reqBody.variations.map((vari: WooProductVariation) => ({regular_price: vari.regular_price, image: vari.image, stock_quantity: vari.stock_quantity, sku: vari.sku, attributes: vari.attributes}))

    const variationData = await api.post(`products/${wooResponse.data.id}/variations/batch`, {create: variations})

    const createdVariations = variationData.data.create

  const retProdBody = JSON.stringify([{
      article: createdProduct.sku,
      name: createdProduct.name,
      url: createdProduct.permalink,
      externalId: createdProduct.id.toString(),
      quantity:10,
      groups: createdProduct.categories.map((prCat: any) => ({
        active: true, externalId: prCat.id.toString(), name: prCat.name, site: 'malik-brand.com'
      })),
    catalogId: 2,
    offers: createdVariations.map((crVar: any) =>{
      console.log(crVar.id)
      return ({
        name: createdProduct.name,
        externalId: crVar.id.toString(),
        article: crVar.sku,
        imageUrl: crVar.image?.src,
        site: 'malik-brand.com',
        stores: [{
          code: 'warehouse',
          available: Number(crVar.stock_quantity).toFixed(),
          purchasePrice: Number(crVar.regular_price).toFixed(2),
        }],
        weight: createdProduct.weight,
        length: createdProduct.dimensions.length,
        width: createdProduct.dimensions.width,
        height: createdProduct.dimensions.height,
      })
    },),
    site: 'malik-brand.com'
    }],)

    const urlencodedProdBody = new URLSearchParams();
    urlencodedProdBody.append("products", retProdBody);

    const retProdRes = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/products/batch/create?apiKey=${process.env.API_KEY}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencodedProdBody
    })
    const retProdResData = await retProdRes.json()

    // const retOfferData = JSON.stringify(createdVariations.map((crVar: any) =>{
    //   console.log(crVar.id)
    //   return ({
    //     productId: retProdResData.addedProducts[0],
    //     name: createdProduct.name,
    //     externalId: crVar.id.toString(),
    //     article: crVar.sku,
    //     imageUrl: crVar.image?.src,
    //     site: 'malik-brand.com',
    //     stores: [{
    //       code: 'warehouse',
    //       available: Number(crVar.stock_quantity).toFixed(),
    //       purchasePrice: Number(crVar.regular_price).toFixed(2),
    //     }],
    //     weight: createdProduct.weight,
    //     length: createdProduct.dimensions.length,
    //     width: createdProduct.dimensions.width,
    //     height: createdProduct.dimensions.height,
    //   })
    // } ))

    //   const urlencodedretOfferBody = new URLSearchParams();
    // urlencodedretOfferBody.append("offers", retOfferData);

    // const retOfferRes = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/products/batch/create?apiKey=${process.env.API_KEY}`, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: urlencodedProdBody
    // })
    // const retOfferResData = await retOfferRes.json()

    // console.log(retProdBodyResData)

  // const retprod = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/products?apiKey=${process.env.API_KEY}`)
  // const retprodData = await retprod.json()


    return res.status(200).json({createdProduct, createdVariations, retProdResData})
    // return res.status(200).json(gusLapki.data)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }

}