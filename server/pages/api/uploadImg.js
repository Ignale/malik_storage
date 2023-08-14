"use strict";
(() => {
var exports = {};
exports.id = 49;
exports.ids = [49];
exports.modules = {

/***/ 5058:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "config": () => (/* binding */ config),
  "default": () => (/* binding */ uploadImg)
});

;// CONCATENATED MODULE: external "formidable"
const external_formidable_namespaceObject = require("formidable");
var external_formidable_default = /*#__PURE__*/__webpack_require__.n(external_formidable_namespaceObject);
;// CONCATENATED MODULE: external "wpapi"
const external_wpapi_namespaceObject = require("wpapi");
var external_wpapi_default = /*#__PURE__*/__webpack_require__.n(external_wpapi_namespaceObject);
;// CONCATENATED MODULE: ./lib/wp.js

function wp() {
  const wp = new (external_wpapi_default())({
    endpoint: 'https://malik-brand.com/wp-json',
    username: process.env.WP_USERNAME,
    password: process.env.WP_PASSWORD,
    auth: true
  });
  return wp;
}
;// CONCATENATED MODULE: ./pages/api/uploadImg.ts


const config = {
  api: {
    bodyParser: false
  }
};
/* harmony default export */ const uploadImg = (async (req, res) => {
  if (req.method !== 'POST') return;
  const api = wp();
  const form = new (external_formidable_default()).IncomingForm({
    multiples: true,
    keepExtensions: true
  });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: 'Неудача',
        message: "Произошла ошибка при отправлении изображения",
        error: err.message
      });
    }

    ;

    if (!Array.isArray(files.file)) {
      const file = files.file;
      api.media().auth({
        username: 'malik',
        password: 'malikmalik'
      }).file(file.filepath).create({
        title: fields.name,
        alt_text: fields.name
      }).then(response => {
        console.log(response);
        res.status(200).json({
          status: 'Успех!',
          message: "Изображение загружено",
          data: [{
            id: response.id,
            src: response.source_url,
            alt_text: response.alt_text
          }]
        });
      }).catch(err => {
        res.status(400).json({
          status: 'Неудача',
          message: "Произошла ошибка при отправлении изображения",
          error: err.message
        });
      });
    } else {
      const filesArr = files.file;
      const data = [];
      filesArr.forEach((file, i) => {
        api.media().auth({
          username: 'malik',
          password: 'malikmalik'
        }).file(file.filepath).create({
          title: fields.name,
          alt_text: fields.name
        }).then(response => {
          console.log(response);
          data.push({
            id: response.id,
            src: response.source_url,
            alt_text: response.alt_text
          });

          if (i === filesArr.length - 1) {
            res.status(200).json({
              status: 'Успех!',
              message: "Изображения загружены",
              data
            });
          }
        }).catch(err => {
          res.status(400).json({
            status: 'Неудача',
            message: "Произошла ошибка при отправлении изображений",
            error: err.message
          });
        });
      });
    }
  });
});

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5058));
module.exports = __webpack_exports__;

})();