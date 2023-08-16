"use strict";
(() => {
var exports = {};
exports.id = 249;
exports.ids = [249];
exports.modules = {

/***/ 6704:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ wc)
});

;// CONCATENATED MODULE: external "@woocommerce/woocommerce-rest-api"
const woocommerce_rest_api_namespaceObject = require("@woocommerce/woocommerce-rest-api");
var woocommerce_rest_api_default = /*#__PURE__*/__webpack_require__.n(woocommerce_rest_api_namespaceObject);
;// CONCATENATED MODULE: ./lib/wc.js

function wc() {
  const WooCommerce = new (woocommerce_rest_api_default())({
    url: 'https://malik-brand.com',
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    version: 'wc/v3'
  });
  return WooCommerce;
}

/***/ }),

/***/ 8107:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_wc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6704);

const api = (0,_lib_wc__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)();
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(req, res) {
  const arg = JSON.parse(req.body);
  const wooData = {
    manage_stock: true,
    stock_quantity: arg.count
  };
  const retailData = JSON.stringify([{
    id: arg.retailId,
    stores: [{
      code: "warehouse",
      available: arg.count
    }]
  }]);
  const urlencoded = new URLSearchParams();
  urlencoded.append("offers", retailData);

  try {
    const wooResponse = await api.put(`products/${arg.productId}/variations/${arg.variationId}`, wooData);
    const defResponse = await fetch('https://malik-storage-default-rtdb.firebaseio.com/defects/.json', {
      method: 'PUT',
      body: JSON.stringify(arg.defectData)
    });
    const updatedDefData = defResponse.json(); // const wooProduct = await api.get(`products/${arg.productId}/variations/${arg.variationId}`)

    const retResponse = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/inventories/upload?apiKey=${process.env.API_KEY}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: urlencoded
    });
    const message = await retResponse.text();
    console.log({
      woo: wooResponse.data,
      ret: message,
      def: updatedDefData
    });
    return res.status(200).json({
      woo: wooResponse.data,
      ret: message,
      def: updatedDefData
    });
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
var __webpack_exports__ = (__webpack_exec__(8107));
module.exports = __webpack_exports__;

})();