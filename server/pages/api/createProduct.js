"use strict";
(() => {
var exports = {};
exports.id = 929;
exports.ids = [929];
exports.modules = {

/***/ 1824:
/***/ ((module) => {

module.exports = require("@woocommerce/woocommerce-rest-api");

/***/ }),

/***/ 7320:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ wc)
/* harmony export */ });
const WooCommerceRestApi = __webpack_require__(1824);

function wc() {
  const WooCommerce = new WooCommerceRestApi({
    url: 'https://malik-brand.com',
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    version: 'wc/v3'
  });
  return WooCommerce;
}

/***/ }),

/***/ 1154:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_wc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7320);

const api = (0,_lib_wc__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(req, res) {
  const reqBody = req.body;
  const wooData = {
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
  };

  try {
    const wooResponse = await api.post(`products`, wooData);
    const createdProduct = wooResponse.data;
    console.log(wooResponse.data);
    const variations = reqBody.variations.map(vari => ({
      regular_price: vari.regular_price,
      image: vari.image,
      stock_quantity: vari.stock_quantity,
      sku: vari.sku,
      attributes: vari.attributes
    }));
    const variationData = await api.post(`products/${wooResponse.data.id}/variations/batch`, {
      create: variations
    }); // const gusLapki = await api.get(`products/4640`)
    // console.log(gusLapki.data)
    // const productGroups = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/product-groups?apiKey=${process.env.API_KEY}`)
    // const productGroupsData = await productGroups.json()
    // console.log(productGroupsData)

    const createdVariations = variationData.data.create;
    const retProdBody = JSON.stringify([{
      article: createdProduct.sku,
      name: createdProduct.name,
      url: createdProduct.permalink,
      externalId: createdProduct.id.toString(),
      quantity: 10,
      groups: createdProduct.categories.map(prCat => ({
        active: true,
        externalId: prCat.id.toString(),
        name: prCat.name,
        site: 'malik-brand.com'
      })),
      catalogId: 2,
      offers: createdVariations.map(crVar => {
        console.log(crVar.id);
        return {
          name: createdProduct.name,
          externalId: crVar.id.toString(),
          article: crVar.sku,
          imageUrl: crVar.image?.src,
          site: 'malik-brand.com',
          stores: [{
            code: 'warehouse',
            available: Number(crVar.stock_quantity).toFixed(),
            purchasePrice: Number(crVar.regular_price).toFixed(2)
          }],
          weight: createdProduct.weight,
          length: createdProduct.dimensions.length,
          width: createdProduct.dimensions.width,
          height: createdProduct.dimensions.height
        };
      }),
      site: 'malik-brand.com'
    }]);
    const urlencodedProdBody = new URLSearchParams();
    urlencodedProdBody.append("products", retProdBody);
    const retProdRes = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/products/batch/create?apiKey=${process.env.API_KEY}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencodedProdBody
    });
    const retProdResData = await retProdRes.json(); // const retOfferData = JSON.stringify(createdVariations.map((crVar: any) =>{
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

    return res.status(200).json({
      createdProduct,
      createdVariations,
      retProdResData
    }); // return res.status(200).json(gusLapki.data)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1154));
module.exports = __webpack_exports__;

})();