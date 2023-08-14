"use strict";
exports.id = 38;
exports.ids = [38];
exports.modules = {

/***/ 4038:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Side)
});

// EXTERNAL MODULE: external "@emotion/styled/base"
var base_ = __webpack_require__(777);
var base_default = /*#__PURE__*/__webpack_require__.n(base_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./public/img/logo_black.png
/* harmony default export */ const logo_black = ({"src":"/_next/static/media/logo_black.4b35e3fb.png","height":571,"width":1563,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAADCAQAAAAEwYbDAAAANUlEQVR42gVAUQqAIBR78fpwlkRF97/mtlQkfAqsqiP77qYSvvjq9uNm+OMRgvJPJuEyN2EBefwYV2rw3LIAAAAASUVORK5CYII=","blurWidth":8,"blurHeight":3});
// EXTERNAL MODULE: external "@mui/icons-material/Storefront"
var Storefront_ = __webpack_require__(7458);
var Storefront_default = /*#__PURE__*/__webpack_require__.n(Storefront_);
// EXTERNAL MODULE: external "@mui/icons-material/AddBusiness"
var AddBusiness_ = __webpack_require__(1791);
var AddBusiness_default = /*#__PURE__*/__webpack_require__.n(AddBusiness_);
// EXTERNAL MODULE: external "@mui/icons-material/CardGiftcard"
var CardGiftcard_ = __webpack_require__(7599);
var CardGiftcard_default = /*#__PURE__*/__webpack_require__.n(CardGiftcard_);
// EXTERNAL MODULE: ./lib/mediaQueries.js
var mediaQueries = __webpack_require__(1039);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
;// CONCATENATED MODULE: ./components/Side.tsx


function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }












const Side = () => {
  const {
    pathname
  } = (0,router_.useRouter)();
  return (0,jsx_runtime_.jsxs)(SideBar, {
    children: [jsx_runtime_.jsx(LogoWrapper, {
      children: jsx_runtime_.jsx((link_default()), {
        href: "/",
        children: jsx_runtime_.jsx(Logo, {
          src: logo_black,
          alt: "Logo"
        })
      })
    }), (0,jsx_runtime_.jsxs)(Menu, {
      children: [jsx_runtime_.jsx(MenuItem, {
        path: pathname === '/allproducts' ? true : false,
        children: (0,jsx_runtime_.jsxs)((link_default()), {
          href: "/allproducts",
          children: [jsx_runtime_.jsx((Storefront_default()), {}), "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B"]
        })
      }), jsx_runtime_.jsx(MenuItem, {
        path: pathname === '/addnew' ? true : false,
        children: (0,jsx_runtime_.jsxs)((link_default()), {
          href: "/addnew",
          children: [jsx_runtime_.jsx((AddBusiness_default()), {}), "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439"]
        })
      }), jsx_runtime_.jsx(MenuItem, {
        path: pathname === '/giftcards' ? true : false,
        children: (0,jsx_runtime_.jsxs)((link_default()), {
          href: "/giftcards",
          children: [jsx_runtime_.jsx((CardGiftcard_default()), {}), "\u041F\u043E\u0434\u0430\u0440\u043E\u0447\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B"]
        })
      })]
    })]
  });
};

/* harmony default export */ const components_Side = (Side);

const SideBar = /*#__PURE__*/base_default()("div",  true ? {
  target: "e1kozu7g4"
} : 0)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '300px',
  width: '20vw',
  height: '100vh',
  backgroundColor: '#3b3a48',
  alignItems: 'center',
  paddingLeft: '10px',
  paddingRight: '10px',
  [mediaQueries/* devices.tablet */.H.tablet]: {
    position: 'absolute',
    zIndex: 10,
    bottom: '0',
    left: '0',
    width: '100vw',
    height: '10vh'
  }
},  true ? "" : 0);

const LogoWrapper = /*#__PURE__*/base_default()("div",  true ? {
  target: "e1kozu7g3"
} : 0)({
  flexBasis: '10vh',
  display: 'flex',
  alignItems: 'center',
  [mediaQueries/* devices.tablet */.H.tablet]: {
    display: 'none'
  }
},  true ? "" : 0);

const Logo = /*#__PURE__*/base_default()((image_default()),  true ? {
  target: "e1kozu7g2"
} : 0)( true ? {
  name: "1ppwghx",
  styles: "width:100%;max-width:200px;height:auto"
} : 0);

const Menu = /*#__PURE__*/base_default()("div",  true ? {
  target: "e1kozu7g1"
} : 0)({
  flexBasis: '60vh',
  width: '100%',
  borderTop: '2px solid #4b4b59',
  borderBottom: '2px solid #4b4b59',
  [mediaQueries/* devices.tablet */.H.tablet]: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: 'none'
  }
},  true ? "" : 0);

const MenuItem = /*#__PURE__*/base_default()('div',  true ? {
  target: "e1kozu7g0"
} : 0)(props => ({
  padding: '20px 10px',
  svg: {
    marginRight: '10px'
  },
  a: {
    display: 'flex',
    alignItems: 'center',
    color: props.path ? '#b1b1d3' : '#818199',
    [mediaQueries/* devices.tablet */.H.tablet]: {
      fontSize: 0
    }
  }
}),  true ? "" : 0);

/***/ }),

/***/ 1039:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H": () => (/* binding */ devices)
/* harmony export */ });
const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};
const devices = {
  mobileS: `@media(max-width: ${sizes.mobileS})`,
  mobileM: `@media(max-width: ${sizes.mobileM})`,
  mobileL: `@media(max-width: ${sizes.mobileL})`,
  tablet: `@media(max-width: ${sizes.tablet})`,
  laptop: `@media(max-width: ${sizes.laptop})`,
  laptopL: `@media(max-width: ${sizes.laptopL})`,
  desktop: `@media(max-width: ${sizes.desktop})`
};

/***/ })

};
;