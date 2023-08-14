"use strict";
exports.id = 670;
exports.ids = [670];
exports.modules = {

/***/ 3670:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777);
/* harmony import */ var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Side__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4038);
/* harmony import */ var _lib_mediaQueries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1039);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }






function Layout({
  children
}) {
  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(Container, {
    children: [_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_Side__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {}), _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(Content, {
      children: children
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

const Container = /*#__PURE__*/_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()('div',  true ? {
  target: "e105wq4n1"
} : 0)( true ? {
  name: "7whenc",
  styles: "display:flex;width:100%"
} : 0);

const Content = /*#__PURE__*/_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0___default()('div',  true ? {
  target: "e105wq4n0"
} : 0)({
  width: '100vw',
  height: '100vh',
  overflowY: 'scroll',
  paddingRight: '20px',
  paddingLeft: '20px',
  [_lib_mediaQueries__WEBPACK_IMPORTED_MODULE_2__/* .devices.tablet */ .H.tablet]: {
    width: '100vw',
    paddingBottom: '12vh'
  }
},  true ? "" : 0);

/***/ })

};
;