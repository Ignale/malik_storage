"use strict";
(() => {
var exports = {};
exports.id = 310;
exports.ids = [310];
exports.modules = {

/***/ 501:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getRetialQuantity)
/* harmony export */ });
async function getRetialQuantity(req, res) {
  try {
    const response = await fetch(`https://malik-brand.retailcrm.ru/api/v5/store/inventories?apiKey=${process.env.API_KEY}&limit=250`);
    const data = await response.json();
    return res.status(200).json(data);
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
var __webpack_exports__ = (__webpack_exec__(501));
module.exports = __webpack_exports__;

})();