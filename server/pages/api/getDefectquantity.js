"use strict";
(() => {
var exports = {};
exports.id = 37;
exports.ids = [37];
exports.modules = {

/***/ 7773:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDefectquantity)
/* harmony export */ });
async function getDefectquantity(req, res) {
  try {
    const response = await fetch(`https://malik-storage-default-rtdb.firebaseio.com/defects/.json`);
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
var __webpack_exports__ = (__webpack_exec__(7773));
module.exports = __webpack_exports__;

})();