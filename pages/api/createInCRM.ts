import type { NextApiRequest, NextApiResponse } from 'next'




export default async function (req: NextApiRequest, res: NextApiResponse) {
  const request = JSON.parse(req.body)
  const createdProduct = request.product
  const createdVariation = request.variation

  console.log(request)

  const retProdBody = JSON.stringify([{
    externalId: createdVariation.databaseId.toString(),
    name: createdProduct.name,
    article: createdVariation.sku,
    quantity: Number(createdVariation.stockQuantity),
    imageUrl: createdVariation.featuredImage?.node.sourceUrl,
    groups: createdProduct.productCategories.nodes.map((prCat: any) => ({
      active: true, externalId: prCat.databaseId.toString(), name: prCat.name, site: 'malik-brand.com'
    })),
    site: 'malik-brand.com',
    weight: 1000,
    length: 290,
    width: 390,
    height: 90,
    catalogId: 2,
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

  const newRetProd = await retProdRes.json()

  console.log(newRetProd)

  // const retOfferData = JSON.stringify({
  //     externalId: createdVariation.databaseId.toString(),
  //     name: createdProduct.name,
  //     article: createdVariation.sku,
  //     imageUrl: createdVariation.featuredImage.node.sourceUrl,
  //     site: 'malik-brand.com',
  //     stores: [{
  //       code: 'warehouse',
  //       available: Number(createdVariation.stock_quantity).toFixed(),
  //       purchasePrice: Number(createdVariation.price).toFixed(2),
  //     }],
  //     parentId: newRetProd.addedProducts[0],
  //     weight: 1000,
  //     length: 290,
  //     width: 390,
  //     height: 90,
  //   })


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
  return res.status(200).json({ createdProduct, createdVariation })
}