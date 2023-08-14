"use strict";
(() => {
var exports = {};
exports.id = 685;
exports.ids = [685];
exports.modules = {

/***/ 7269:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7447);
/* harmony import */ var primereact_datatable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(primereact_datatable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8145);
/* harmony import */ var primereact_column__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(primereact_column__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swr_mutation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5401);
/* harmony import */ var primereact_calendar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7757);
/* harmony import */ var primereact_calendar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primereact_calendar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var primereact_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1404);
/* harmony import */ var primereact_dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(primereact_dropdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9093);
/* harmony import */ var primereact_inputtext__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var primereact_inputnumber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5514);
/* harmony import */ var primereact_inputnumber__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primereact_inputnumber__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var primereact_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1088);
/* harmony import */ var primereact_button__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primereact_button__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var primereact_toast__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(333);
/* harmony import */ var primereact_toast__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(primereact_toast__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swr_mutation__WEBPACK_IMPORTED_MODULE_2__]);
swr_mutation__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];












const statusOptions = [{
  name: 'Использован',
  label: 'used'
}, {
  name: 'Активен',
  label: 'active'
}];
const columns = [{
  field: 'code',
  header: 'Код карты'
}, {
  field: 'giver',
  header: 'ФИО дарителя, тел'
}, {
  field: 'reciever',
  header: 'ФИО получателя, тел'
}, {
  field: 'amount',
  header: 'Сумма сертификата'
}, {
  field: 'date',
  header: 'Дата'
}, {
  field: 'manager',
  header: 'Менеджер '
}, {
  field: 'status',
  header: 'Статус'
}];

async function mutateSert(url, {
  arg
}) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(arg)
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function Sertificates({
  sertificates
}) {
  const {
    0: sert,
    1: setSert
  } = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(() => sertificates);
  let toast = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
  const {
    trigger
  } = (0,swr_mutation__WEBPACK_IMPORTED_MODULE_2__["default"])(`/api/mutateSert`, mutateSert, {
    onError: err => {
      console.log(err);
      toast.current.show({
        severity: 'error',
        summary: 'Ошибка',
        detail: err.message,
        life: 3000
      });
    },
    onSuccess: data => {
      const resp = data;
      toast.current.show({
        severity: 'success',
        summary: 'Успешно',
        detail: 'Карта добавлена',
        life: 3000
      });
    },
    revalidate: true
  });

  const amountEditor = options => {
    return _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(primereact_inputnumber__WEBPACK_IMPORTED_MODULE_6__.InputNumber, {
      value: options.value,
      onValueChange: e => options.editorCallback?.(e.value),
      mode: "currency",
      currency: "RUB"
    });
  };

  const textEditor = options => {
    return _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(primereact_inputtext__WEBPACK_IMPORTED_MODULE_5__.InputText, {
      type: "text",
      value: options.value,
      onChange: e => options.editorCallback?.(e.target.value)
    });
  };

  const dataEditor = options => {
    return _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(primereact_calendar__WEBPACK_IMPORTED_MODULE_3__.Calendar, {
      dateFormat: "dd.mm.yyyy",
      value: options.value,
      onChange: e => {
        const date = new Date(e.target.value);
        const year = date.toLocaleString('default', {
          year: 'numeric'
        });
        const month = date.toLocaleString('default', {
          month: '2-digit'
        });
        const day = date.toLocaleString('default', {
          day: '2-digit'
        });
        let formatedDate = [day, month, year].join('.');
        return options.editorCallback?.(formatedDate);
      }
    });
  };

  const statusEditor = options => {
    console.log(options);
    return _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(primereact_dropdown__WEBPACK_IMPORTED_MODULE_4__.Dropdown, {
      value: statusOptions.find(opt => opt.label === options.value),
      onChange: e => options.editorCallback?.(e.target.value.label),
      options: statusOptions,
      optionLabel: "name"
    });
  };

  const cellEditor = options => {
    if (options.field === 'amount') return amountEditor(options);
    if (options.field === 'date') return dataEditor(options);
    if (options.field === 'status') return statusEditor(options);
    return textEditor(options);
  };

  const statusBody = rowData => {
    console.log(rowData);
    return statusOptions.find(opt => opt.label === rowData.status)?.name;
  };

  const onRowEditComplete = e => {
    let sertificates = [...sert];
    let {
      newData,
      index
    } = e;
    console.log(e);
    sertificates[index] = newData;
    sertificates[index].status = newData.status;
    trigger(sertificates);
    setSert(sertificates);
  };

  const addRow = () => {
    setSert(prev => [...prev, {
      amount: 0,
      code: "",
      date: "",
      giver: '',
      reciever: '',
      manager: '',
      status: ''
    }]);
  };

  return (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("div", {
    className: "card p-fluid",
    children: [_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(primereact_toast__WEBPACK_IMPORTED_MODULE_9__.Toast, {
      ref: toast
    }), (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(primereact_datatable__WEBPACK_IMPORTED_MODULE_0__.DataTable, {
      value: sert,
      editMode: "row",
      tableStyle: {
        minWidth: '50rem'
      },
      onRowEditComplete: onRowEditComplete,
      children: [columns.map(({
        field,
        header
      }) => {
        return _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(primereact_column__WEBPACK_IMPORTED_MODULE_1__.Column, {
          field: field,
          header: header,
          style: {
            width: '25%'
          },
          body: field === 'status' && statusBody,
          editor: options => cellEditor(options)
        }, field);
      }), _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(primereact_column__WEBPACK_IMPORTED_MODULE_1__.Column, {
        rowEditor: true,
        headerStyle: {
          width: '10%',
          minWidth: '8rem'
        },
        bodyStyle: {
          textAlign: 'center'
        }
      })]
    }), _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(primereact_button__WEBPACK_IMPORTED_MODULE_8__.Button, {
      onClick: addRow,
      className: "mt-5",
      icon: "pi pi-plus",
      rounded: true,
      "aria-label": "Filter"
    })]
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sertificates);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5778:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Giftcards),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3670);
/* harmony import */ var _components_Sertificates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7269);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Sertificates__WEBPACK_IMPORTED_MODULE_1__]);
_components_Sertificates__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



function Giftcards({
  sertificates
}) {
  return _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z, {
    children: _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_components_Sertificates__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
      sertificates: sertificates
    })
  });
}
async function getServerSideProps() {
  const response = await fetch('https://malik-storage-default-rtdb.firebaseio.com/sertificates.json');
  const sertificates = await response.json();
  console.log(sertificates);
  return {
    props: {
      sertificates
    }
  };
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5193:
/***/ ((module) => {

module.exports = require("@emotion/react/jsx-runtime");

/***/ }),

/***/ 777:
/***/ ((module) => {

module.exports = require("@emotion/styled/base");

/***/ }),

/***/ 1791:
/***/ ((module) => {

module.exports = require("@mui/icons-material/AddBusiness");

/***/ }),

/***/ 7599:
/***/ ((module) => {

module.exports = require("@mui/icons-material/CardGiftcard");

/***/ }),

/***/ 7458:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Storefront");

/***/ }),

/***/ 3918:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 1088:
/***/ ((module) => {

module.exports = require("primereact/button");

/***/ }),

/***/ 7757:
/***/ ((module) => {

module.exports = require("primereact/calendar");

/***/ }),

/***/ 8145:
/***/ ((module) => {

module.exports = require("primereact/column");

/***/ }),

/***/ 7447:
/***/ ((module) => {

module.exports = require("primereact/datatable");

/***/ }),

/***/ 1404:
/***/ ((module) => {

module.exports = require("primereact/dropdown");

/***/ }),

/***/ 5514:
/***/ ((module) => {

module.exports = require("primereact/inputnumber");

/***/ }),

/***/ 9093:
/***/ ((module) => {

module.exports = require("primereact/inputtext");

/***/ }),

/***/ 333:
/***/ ((module) => {

module.exports = require("primereact/toast");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5401:
/***/ ((module) => {

module.exports = import("swr/mutation");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [597,61,38,670], () => (__webpack_exec__(5778)));
module.exports = __webpack_exports__;

})();