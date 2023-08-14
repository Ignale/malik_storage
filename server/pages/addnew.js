"use strict";
(() => {
var exports = {};
exports.id = 34;
exports.ids = [34];
exports.modules = {

/***/ 4266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Addnew),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: ./components/Layout.tsx
var Layout = __webpack_require__(3670);
;// CONCATENATED MODULE: external "primereact/fieldset"
const fieldset_namespaceObject = require("primereact/fieldset");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "primereact/inputtext"
var inputtext_ = __webpack_require__(9093);
;// CONCATENATED MODULE: external "primereact/inputtextarea"
const inputtextarea_namespaceObject = require("primereact/inputtextarea");
;// CONCATENATED MODULE: external "primereact/multiselect"
const multiselect_namespaceObject = require("primereact/multiselect");
;// CONCATENATED MODULE: external "primereact/divider"
const divider_namespaceObject = require("primereact/divider");
;// CONCATENATED MODULE: external "formik"
const external_formik_namespaceObject = require("formik");
// EXTERNAL MODULE: external "primereact/dropdown"
var dropdown_ = __webpack_require__(1404);
// EXTERNAL MODULE: external "primereact/button"
var button_ = __webpack_require__(1088);
// EXTERNAL MODULE: external "primereact/inputnumber"
var inputnumber_ = __webpack_require__(5514);
// EXTERNAL MODULE: external "primereact/toast"
var toast_ = __webpack_require__(333);
;// CONCATENATED MODULE: external "crypto"
const external_crypto_namespaceObject = require("crypto");
// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
;// CONCATENATED MODULE: ./components/NewProductForm.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















const initialVariation = {
  regular_price: '',
  id: Math.random().toString(36),
  sku: '',
  image: {},
  stock_quantity: null,
  stock_status: 'instock',
  attributes: [],
  manage_stock: true,
  dimensions: {
    length: '290',
    width: '390',
    height: '90'
  },
  weight: '1000'
};

function NewProductForm({
  sku,
  images,
  categories,
  attributes
}) {
  const {
    0: cat,
    1: setCat
  } = (0,external_react_.useState)(null);
  const toast = (0,external_react_.useRef)(null);
  const formik = (0,external_formik_namespaceObject.useFormik)({
    initialValues: {
      name: '',
      type: 'variable',
      categories: [],
      images: [],
      variations: [initialVariation],
      meta_data: [{
        key: 'product_description',
        value: ''
      }, {
        key: 'product_care',
        value: ''
      }, {
        key: 'product_measurements',
        value: 'test'
      }, {
        key: 'model_measurements',
        value: ''
      }, {
        key: "shipping",
        value: ''
      }],
      sku: external_crypto_namespaceObject.randomBytes(4).toString('hex').toUpperCase(),
      regular_price: 0,
      manage_stock: true,
      stock_quantity: 10,
      on_sale: false,
      sale_price: 0,
      stock_status: 'instock',
      status: 'publish',
      backorders: 'no',
      date_on_sale_from: '',
      date_on_sale_to: '',
      attributes: [],
      lang: 'ru',
      default_attributes: [],
      backorders_allowed: false,
      dimensions: {
        length: '290',
        width: '390',
        height: '90'
      },
      weight: '1000'
    },
    onSubmit: async (values, {
      setSubmitting,
      resetForm
    }) => {
      setSubmitting(true);

      try {
        const res = await fetch('/api/createProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          toast.current.show({
            severity: 'success',
            summary: 'Успешно',
            detail: 'Товар создан',
            life: 3000
          });
          setSubmitting(false);
          resetForm();
        } else {
          const data = await res.json();
          console.log(data);
          toast.current.show({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Товар не создан',
            life: 3000
          });
          setSubmitting(false);
          resetForm();
        }
      } catch (e) {
        console.log(e);
        toast.current.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Товар не создан',
          life: 3000
        });
        setSubmitting(false);
        resetForm();
      }
    }
  });
  console.log(formik.values);
  formik.initialValues.images = images;

  const imageOptionTemplate = option => {
    return (0,jsx_runtime_.jsxs)("div", {
      className: "flex align-items-center",
      children: [jsx_runtime_.jsx("img", {
        width: 50,
        height: 50,
        style: {
          objectFit: 'cover'
        },
        src: option?.src,
        alt: option?.alt_text
      }), jsx_runtime_.jsx("span", {
        children: option?.alt_text
      })]
    });
  };

  const imageTemplate = index => {
    const option = formik.values.variations[index].image;

    if (option.src) {
      return (0,jsx_runtime_.jsxs)("div", {
        className: "flex align-items-center",
        children: [jsx_runtime_.jsx("img", {
          width: 50,
          height: 50,
          style: {
            objectFit: 'cover'
          },
          src: option.src,
          alt: option.alt_text
        }), jsx_runtime_.jsx("span", {
          children: option.alt_text
        })]
      });
    }

    return jsx_runtime_.jsx("span", {
      children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"
    });
  };

  const metaDataHandler = e => {
    const key = e.target.id;
    const value = e.target.value;
    const index = formik.values.meta_data.findIndex(item => item.key === key);
    formik.setFormikState(state => _objectSpread(_objectSpread({}, state), {}, {
      values: _objectSpread(_objectSpread({}, state.values), {}, {
        meta_data: [...state.values.meta_data.slice(0, index), _objectSpread(_objectSpread({}, state.values.meta_data[index]), {}, {
          value: value
        }), ...state.values.meta_data.slice(index + 1)]
      })
    }));
  };

  const variationImageHandler = (e, index) => {
    console.log(e.value);
    formik.setFormikState(state => {
      const newVariations = [...state.values.variations];
      newVariations[index].image = e.value;
      return _objectSpread(_objectSpread({}, state), {}, {
        values: _objectSpread(_objectSpread({}, state.values), {}, {
          variations: newVariations
        })
      });
    });
  };

  const variationPriceHandler = (e, index) => {
    const key = e.originalEvent.target.id;
    const value = e.value;
    formik.setFormikState(state => {
      const newVariations = [...state.values.variations];
      newVariations[index] = _objectSpread(_objectSpread({}, state.values.variations[index]), {}, {
        regular_price: value?.toString() + '.00'
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        values: _objectSpread(_objectSpread({}, state.values), {}, {
          variations: newVariations
        })
      });
    });
  };

  const variationQuantityHandler = (e, index) => {
    const key = e.originalEvent.target.id;
    const value = e.value;
    formik.setFormikState(state => {
      const newVariations = [...state.values.variations];
      newVariations[index] = _objectSpread(_objectSpread({}, state.values.variations[index]), {}, {
        stock_quantity: value
      });
      return _objectSpread(_objectSpread({}, state), {}, {
        values: _objectSpread(_objectSpread({}, state.values), {}, {
          variations: newVariations
        })
      });
    });
  };

  const attrTemplate = (index, optionId) => formik.values.variations[index].attributes[formik.values.variations[index].attributes.findIndex(att => att.id === optionId)]?.option;

  const attributeHandler = (e, index) => {
    console.log({
      e,
      index
    });
    const id = e.target.id === 'pa_cvet' ? 6 : 7;
    const option = e.value;
    const attVarIndex = formik.values.variations[index].attributes.findIndex(att => att.id === id);
    const attrIndex = formik.values.attributes.findIndex(att => att.id === id);
    formik.setFormikState(state => {
      const newVariations = [...state.values.variations];
      let newAttr = [...state.values.attributes];
      let newDefAttr = [...state.values.default_attributes];
      newVariations[index].attributes = [...newVariations[index].attributes.slice(0, attVarIndex), {
        id: id,
        slug: e.target.id,
        name: e.target.id === 'pa_cvet' ? "Color" : "Size",
        option: option.name
      }, ...newVariations[index].attributes.slice(attVarIndex + 1)];
      newDefAttr = [...newDefAttr.slice(0, attrIndex), {
        id: id,
        name: e.target.id === 'pa_cvet' ? "Color" : "Size",
        option: option.name
      }, ...newDefAttr.slice(attrIndex + 1)];
      newAttr = [...newAttr.slice(0, attrIndex), {
        id: id,
        slug: e.target.id,
        name: e.target.id === 'pa_cvet' ? "Color" : "Size",
        visible: true,
        position: 0,
        variation: true,
        options: newAttr[attrIndex] ? [...newAttr[attrIndex].options, option.name] : [option.name]
      }, ...newAttr.slice(attrIndex + 1)];
      newVariations[index].sku = `${formik.values.sku}-${newVariations[index].attributes.map(att => att.option?.slice(0, 2)).join('')}`;
      return _objectSpread(_objectSpread({}, state), {}, {
        values: _objectSpread(_objectSpread({}, state.values), {}, {
          attributes: newAttr,
          variations: newVariations
        })
      });
    });
  };

  return (0,jsx_runtime_.jsxs)(fieldset_namespaceObject.Fieldset, {
    className: "my-3",
    children: [jsx_runtime_.jsx(toast_.Toast, {
      ref: toast
    }), (0,jsx_runtime_.jsxs)("form", {
      onSubmit: formik.handleSubmit,
      id: "newProductForm",
      className: "flex flex-column gap-5",
      action: "sumbit",
      children: [jsx_runtime_.jsx(divider_namespaceObject.Divider, {
        children: (0,jsx_runtime_.jsxs)("div", {
          className: "inline-flex align-items-center",
          children: [jsx_runtime_.jsx("i", {
            className: "pi pi-id-card mr-2"
          }), jsx_runtime_.jsx("b", {
            children: "\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435"
          })]
        })
      }), (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-1 flex-column gap-1",
        children: [jsx_runtime_.jsx("label", {
          htmlFor: "name",
          children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u043B\u0430\u0442\u044C\u044F"
        }), jsx_runtime_.jsx(inputtext_.InputText, {
          value: formik.values.name,
          name: "name",
          onChange: formik.handleChange,
          id: "name"
        })]
      }), (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-column md:flex-row gap-3",
        children: [(0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-column flex-1 gap-1",
          children: [jsx_runtime_.jsx("label", {
            className: "mr-3",
            htmlFor: "regular_price",
            children: "\u0426\u0435\u043D\u0430"
          }), (0,jsx_runtime_.jsxs)("div", {
            className: "p-inputgroup  flex-1",
            children: [jsx_runtime_.jsx("span", {
              className: "p-inputgroup-addon",
              children: "\u20BD"
            }), jsx_runtime_.jsx(inputnumber_.InputNumber, {
              value: formik.values.regular_price,
              onChange: e => {
                formik.setFieldValue('regular_price', e.value?.toFixed(2));
              },
              placeholder: "\u0426\u0435\u043D\u0430",
              id: "regular_price"
            }), jsx_runtime_.jsx("span", {
              className: "p-inputgroup-addon",
              children: ".00"
            })]
          })]
        }), (0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-column flex-1 gap-1",
          children: [jsx_runtime_.jsx("label", {
            className: "mr-3",
            htmlFor: "sku",
            children: "\u0410\u0440\u0442\u0438\u043A\u0443\u043B"
          }), (0,jsx_runtime_.jsxs)("div", {
            className: "p-inputgroup flex-1",
            children: [jsx_runtime_.jsx("span", {
              className: "p-inputgroup-addon",
              children: "#"
            }), jsx_runtime_.jsx(inputtext_.InputText, {
              disabled: true,
              value: formik.values.sku,
              id: "sku"
            })]
          })]
        })]
      }), jsx_runtime_.jsx(multiselect_namespaceObject.MultiSelect, {
        value: cat,
        id: "categories",
        onChange: e => {
          setCat(e.value);
          formik.setFormikState(prev => {
            const newVal = [...e.value].map(val => ({
              id: val.databaseId
            }));
            console.log(newVal);
            console.log([...e.value]);
            return _objectSpread(_objectSpread({}, prev), {}, {
              values: _objectSpread(_objectSpread({}, prev.values), {}, {
                categories: [...newVal]
              })
            });
          });
        },
        options: categories,
        optionLabel: "name",
        display: "chip",
        placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
        maxSelectedLabels: 10,
        className: "w-full"
      }), (0,jsx_runtime_.jsxs)("div", {
        className: "flex md:flex-row flex-column gap-3",
        children: [(0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-1 flex-column gap-1",
          children: [jsx_runtime_.jsx("label", {
            htmlFor: "product_description",
            children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435"
          }), jsx_runtime_.jsx(inputtextarea_namespaceObject.InputTextarea, {
            value: formik.values.meta_data[formik.values.meta_data.findIndex(met => met.key === 'product_description')].value,
            onChange: metaDataHandler,
            rows: 5,
            cols: 30,
            id: "product_description"
          })]
        }), (0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-1  flex-column gap-1",
          children: [jsx_runtime_.jsx("label", {
            htmlFor: "product_care",
            children: "\u0423\u0445\u043E\u0434"
          }), jsx_runtime_.jsx(inputtextarea_namespaceObject.InputTextarea, {
            value: formik.values.meta_data[formik.values.meta_data.findIndex(met => met.key === 'product_care')].value,
            onChange: metaDataHandler,
            rows: 5,
            cols: 30,
            id: "product_care"
          })]
        })]
      }), (0,jsx_runtime_.jsxs)("div", {
        className: "flex md:flex-row flex-column gap-3",
        children: [(0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-1  flex-column gap-1",
          children: [jsx_runtime_.jsx("label", {
            htmlFor: "product_measurements",
            children: "\u0420\u0430\u0437\u043C\u0435\u0440\u044B \u043F\u043B\u0430\u0442\u044C\u044F"
          }), jsx_runtime_.jsx(inputtextarea_namespaceObject.InputTextarea, {
            value: formik.values.meta_data[formik.values.meta_data.findIndex(met => met.key === 'product_measurements')].value,
            onChange: metaDataHandler,
            rows: 5,
            cols: 30,
            id: "product_measurements"
          })]
        }), (0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-1  flex-column gap-1",
          children: [jsx_runtime_.jsx("label", {
            htmlFor: "model_measurements",
            children: "\u0420\u0430\u0437\u043C\u0435\u0440\u044B \u043C\u043E\u0434\u0435\u043B\u0438"
          }), jsx_runtime_.jsx(inputtextarea_namespaceObject.InputTextarea, {
            value: formik.values.meta_data[formik.values.meta_data.findIndex(met => met.key === 'model_measurements')].value,
            onChange: metaDataHandler,
            rows: 5,
            cols: 30,
            id: "model_measurements"
          })]
        })]
      }), jsx_runtime_.jsx("div", {
        className: "flex md:flex-row flex-column gap-3",
        children: (0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-1  flex-column gap-1",
          children: [jsx_runtime_.jsx("label", {
            htmlFor: "shipping",
            children: "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430"
          }), jsx_runtime_.jsx(inputtextarea_namespaceObject.InputTextarea, {
            value: formik.values.meta_data[formik.values.meta_data.findIndex(met => met.key === 'shipping')].value,
            onChange: metaDataHandler,
            rows: 5,
            cols: 30,
            id: "shipping"
          })]
        })
      }), jsx_runtime_.jsx(divider_namespaceObject.Divider, {
        style: {
          marginBottom: '0px'
        },
        children: (0,jsx_runtime_.jsxs)("div", {
          className: "inline-flex align-items-center mb-0",
          children: [jsx_runtime_.jsx("i", {
            className: "pi pi-th-large mr-2"
          }), jsx_runtime_.jsx("b", {
            children: "\u0412\u0430\u0440\u0438\u0430\u0446\u0438\u0438"
          })]
        })
      }), formik.values.variations.map((variation, index) => (0,jsx_runtime_.jsxs)("div", {
        className: "pl-5",
        children: [jsx_runtime_.jsx(divider_namespaceObject.Divider, {
          children: (0,jsx_runtime_.jsxs)("p", {
            children: ["#", index + 1, " \u0412\u0430\u0440\u0438\u0430\u0446\u0438\u044F"]
          })
        }), (0,jsx_runtime_.jsxs)("div", {
          className: "flex flex-column gap-3",
          children: [jsx_runtime_.jsx(dropdown_.Dropdown, {
            onChange: e => variationImageHandler(e, index),
            valueTemplate: imageTemplate(index),
            id: "images",
            options: formik.values.images,
            itemTemplate: imageOptionTemplate,
            placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
            className: "w-full"
          }), (0,jsx_runtime_.jsxs)("div", {
            className: "flex flex-column md:flex-row gap-3",
            children: [jsx_runtime_.jsx(dropdown_.Dropdown, {
              value: variation.attributes[variation.attributes.findIndex(attr => attr.id === 6)],
              valueTemplate: attrTemplate(index, 6),
              id: "pa_cvet",
              onChange: e => attributeHandler(e, index),
              options: attributes.pa_cvet,
              optionLabel: "name",
              placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442",
              className: "w-full "
            }), jsx_runtime_.jsx(dropdown_.Dropdown, {
              value: variation.attributes[variation.attributes.findIndex(attr => attr.id === 7)],
              valueTemplate: attrTemplate(index, 7),
              id: "pa_size",
              onChange: e => attributeHandler(e, index),
              options: attributes.pa_size,
              optionLabel: "name",
              placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440",
              className: "w-full "
            })]
          }), (0,jsx_runtime_.jsxs)("div", {
            className: "flex flex-column sm:flex-row gap-3",
            children: [(0,jsx_runtime_.jsxs)("div", {
              className: "p-inputgroup flex-1",
              children: [jsx_runtime_.jsx("span", {
                className: "p-inputgroup-addon",
                children: "\u20BD"
              }), jsx_runtime_.jsx(inputnumber_.InputNumber, {
                value: Number(variation.regular_price),
                placeholder: "\u0426\u0435\u043D\u0430",
                onChange: e => {
                  variationPriceHandler.call(null, e, index);
                },
                inputId: "var_regular_price"
              }), jsx_runtime_.jsx("span", {
                className: "p-inputgroup-addon",
                children: ".00"
              })]
            }), (0,jsx_runtime_.jsxs)("div", {
              className: "p-inputgroup flex-1",
              children: [jsx_runtime_.jsx("span", {
                className: "p-inputgroup-addon",
                children: jsx_runtime_.jsx("i", {
                  className: "pi pi-cart-plus"
                })
              }), jsx_runtime_.jsx(inputnumber_.InputNumber, {
                value: Number(variation.stock_quantity),
                onChange: e => {
                  variationQuantityHandler.call(null, e, index);
                },
                placeholder: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u0430",
                inputId: "var_stock_quantity"
              })]
            }), (0,jsx_runtime_.jsxs)("div", {
              className: "p-inputgroup flex-1",
              children: [jsx_runtime_.jsx("span", {
                className: "p-inputgroup-addon",
                children: "#"
              }), jsx_runtime_.jsx(inputtext_.InputText, {
                disabled: true,
                value: variation.sku,
                placeholder: "\u0410\u0440\u0442\u0438\u043A\u0443\u043B",
                id: "var_sku"
              })]
            })]
          }), (0,jsx_runtime_.jsxs)("div", {
            className: "flex flex-column sm:flex-row gap-3",
            children: [Object.keys(variation.dimensions).map((key, index) => (0,jsx_runtime_.jsxs)("div", {
              className: "p-inputgroup flex-1",
              children: [jsx_runtime_.jsx("span", {
                className: "p-inputgroup-addon",
                children: jsx_runtime_.jsx("i", {
                  className: "pi pi-box"
                })
              }), jsx_runtime_.jsx(inputnumber_.InputNumber, {
                value: Number(variation.dimensions[key]),
                placeholder: key,
                id: key
              }), jsx_runtime_.jsx("span", {
                className: "p-inputgroup-addon",
                children: "\u043C\u043C"
              })]
            }, key)), (0,jsx_runtime_.jsxs)("div", {
              className: "p-inputgroup flex-1",
              children: [jsx_runtime_.jsx("span", {
                className: "p-inputgroup-addon",
                children: jsx_runtime_.jsx("i", {
                  className: "pi pi-box"
                })
              }), jsx_runtime_.jsx(inputnumber_.InputNumber, {
                placeholder: "\u0412\u0435\u0441",
                value: Number(variation.weight),
                id: "weight"
              }), jsx_runtime_.jsx("span", {
                className: "p-inputgroup-addon",
                children: "\u0433\u0440"
              })]
            })]
          })]
        })]
      }, index)), jsx_runtime_.jsx("div", {
        className: "flex justify-content-center mt-5",
        children: jsx_runtime_.jsx(button_.Button, {
          type: "button",
          onClick: e => {
            e.preventDefault;
            formik.setFormikState(prev => _objectSpread(_objectSpread({}, prev), {}, {
              values: _objectSpread(_objectSpread({}, prev.values), {}, {
                variations: [...prev.values.variations, _objectSpread(_objectSpread({}, initialVariation), {}, {
                  id: Math.random().toString(36)
                })]
              })
            }));
          },
          label: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u0440\u0438\u0430\u0446\u0438\u044E",
          icon: "pi pi-plus"
        })
      }), jsx_runtime_.jsx(divider_namespaceObject.Divider, {
        style: {
          marginBottom: '0px'
        }
      }), jsx_runtime_.jsx("div", {
        className: "flex justify-content-center mt-3",
        children: jsx_runtime_.jsx(button_.Button, {
          type: "submit",
          label: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
          loading: formik.isSubmitting,
          icon: "pi pi-save",
          className: "p-button-success"
        })
      })]
    })]
  });
}

/* harmony default export */ const components_NewProductForm = (NewProductForm);
;// CONCATENATED MODULE: external "primereact/fileupload"
const fileupload_namespaceObject = require("primereact/fileupload");
;// CONCATENATED MODULE: external "primereact/progressbar"
const progressbar_namespaceObject = require("primereact/progressbar");
;// CONCATENATED MODULE: external "primereact/progressspinner"
const progressspinner_namespaceObject = require("primereact/progressspinner");
;// CONCATENATED MODULE: external "primereact/tooltip"
const tooltip_namespaceObject = require("primereact/tooltip");
// EXTERNAL MODULE: external "primereact/tag"
var tag_ = __webpack_require__(5083);
;// CONCATENATED MODULE: ./components/ImgUpload.tsx










function ImgUpload({
  onUpload
}) {
  const toast = (0,external_react_.useRef)(null);
  const {
    0: totalSize,
    1: setTotalSize
  } = (0,external_react_.useState)(0);
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  const {
    0: uploadData,
    1: setUploadData
  } = (0,external_react_.useState)([]);
  const fileUploadRef = (0,external_react_.useRef)(null);

  const onTemplateSelect = e => {
    let _totalSize = totalSize;
    let files = e.files;
    Object.keys(files).forEach((key, index) => {
      _totalSize += files[index].size || 0;
    });
    setTotalSize(_totalSize);
  };

  const ImgUploadHandler = async e => {
    let _totalSize = 0;
    e.files.forEach(file => {
      _totalSize += file.size || 0;
    });
    setUploadData([]);
    setTotalSize(_totalSize);
    let formData = new FormData();
    e.files.forEach(file => {
      formData.append('file', file);
      formData.append('name', file.name);
    });

    try {
      setLoading(true);
      const response = await fetch(e.options.props.url, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        e.options.clear();
        onUpload(data.data);
        toast.current.show({
          severity: 'success',
          summary: 'Успех',
          detail: data.message
        });
      }
    } catch (err) {
      setLoading(false);
      toast.current.show({
        severity: 'error',
        summary: 'Неудача',
        detail: err.message
      });
    }
  };

  const onTemplateRemove = (file, callback, e) => {
    setTotalSize(totalSize - file.size);
    callback(e);
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = options => {
    const {
      className,
      chooseButton,
      uploadButton,
      cancelButton
    } = options;
    const value = totalSize / 100000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
    return (0,jsx_runtime_.jsxs)("div", {
      className: className,
      style: {
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center'
      },
      children: [chooseButton, uploadButton, cancelButton, loading && jsx_runtime_.jsx(progressspinner_namespaceObject.ProgressSpinner, {
        style: {
          width: '40px',
          height: '40px'
        }
      }), (0,jsx_runtime_.jsxs)("div", {
        className: "flex align-items-center gap-3 ml-auto",
        children: [(0,jsx_runtime_.jsxs)("span", {
          children: [formatedValue, " / 5 MB"]
        }), jsx_runtime_.jsx(progressbar_namespaceObject.ProgressBar, {
          value: value,
          showValue: false,
          style: {
            width: '10rem',
            height: '12px'
          }
        })]
      })]
    });
  };

  const itemTemplate = (file, props) => {
    return (0,jsx_runtime_.jsxs)("div", {
      className: "flex align-items-center flex-wrap",
      children: [(0,jsx_runtime_.jsxs)("div", {
        className: "flex align-items-center",
        style: {
          width: '40%'
        },
        children: [jsx_runtime_.jsx("img", {
          alt: file.name,
          role: "presentation",
          src: file.objectURL,
          width: 100
        }), (0,jsx_runtime_.jsxs)("span", {
          className: "flex flex-column text-left ml-3",
          children: [file.name, jsx_runtime_.jsx("small", {
            children: new Date().toLocaleDateString()
          })]
        })]
      }), jsx_runtime_.jsx(tag_.Tag, {
        value: props.formatSize,
        severity: "warning",
        className: "px-3 py-2"
      }), jsx_runtime_.jsx(button_.Button, {
        type: "button",
        icon: "pi pi-times",
        className: "p-button-outlined p-button-rounded p-button-danger ml-auto",
        onClick: e => onTemplateRemove(file, props.onRemove, e)
      })]
    });
  };

  const emptyTemplate = () => {
    return (0,jsx_runtime_.jsxs)("div", {
      className: "flex align-items-center flex-column",
      children: [jsx_runtime_.jsx("i", {
        className: "pi pi-image mt-3 p-5",
        style: {
          fontSize: '5em',
          borderRadius: '50%',
          backgroundColor: 'var(--surface-b)',
          color: 'var(--surface-d)'
        }
      }), jsx_runtime_.jsx("span", {
        style: {
          fontSize: '1.2em',
          color: 'var(--text-color-secondary)'
        },
        className: "my-5",
        children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0441\u044E\u0434\u0430 \u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0443 \u0432\u044B\u0431\u043E\u0440\u0430"
      })]
    });
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-images',
    iconOnly: true,
    className: 'custom-choose-btn p-button-rounded p-button-outlined'
  };
  const uploadOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    iconOnly: true,
    className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'
  };
  const cancelOptions = {
    icon: 'pi pi-fw pi-times',
    iconOnly: true,
    className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
  };
  return (0,jsx_runtime_.jsxs)("div", {
    children: [jsx_runtime_.jsx(toast_.Toast, {
      ref: toast
    }), jsx_runtime_.jsx(tooltip_namespaceObject.Tooltip, {
      target: ".custom-choose-btn",
      content: "Choose",
      position: "bottom"
    }), jsx_runtime_.jsx(tooltip_namespaceObject.Tooltip, {
      target: ".custom-upload-btn",
      content: "Upload",
      position: "bottom"
    }), jsx_runtime_.jsx(tooltip_namespaceObject.Tooltip, {
      target: ".custom-cancel-btn",
      content: "Clear",
      position: "bottom"
    }), jsx_runtime_.jsx(fileupload_namespaceObject.FileUpload, {
      ref: fileUploadRef,
      name: "uploadImages",
      url: "/api/uploadImg",
      multiple: true,
      accept: "image/*",
      maxFileSize: 10000000,
      onSelect: onTemplateSelect,
      onError: onTemplateClear,
      onClear: onTemplateClear,
      headerTemplate: headerTemplate,
      itemTemplate: itemTemplate,
      emptyTemplate: emptyTemplate,
      chooseOptions: chooseOptions,
      uploadOptions: uploadOptions,
      cancelOptions: cancelOptions,
      customUpload: true,
      uploadHandler: ImgUploadHandler
    })]
  });
}
// EXTERNAL MODULE: external "@emotion/styled/base"
var base_ = __webpack_require__(777);
var base_default = /*#__PURE__*/__webpack_require__.n(base_);
;// CONCATENATED MODULE: external "primereact/dialog"
const dialog_namespaceObject = require("primereact/dialog");
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(9114);
;// CONCATENATED MODULE: external "primereact/paginator"
const paginator_namespaceObject = require("primereact/paginator");
// EXTERNAL MODULE: ./lib/mediaQueries.js
var mediaQueries = __webpack_require__(1039);
;// CONCATENATED MODULE: ./components/ImgChoose.tsx













function ImgChoose({
  onChoose
}) {
  const {
    0: visible,
    1: setVisible
  } = (0,external_react_.useState)(false);
  const {
    0: rows,
    1: setRows
  } = (0,external_react_.useState)(20);
  const {
    0: first,
    1: setFirst
  } = (0,external_react_.useState)(20);
  const {
    0: endCursor,
    1: setEndCursor
  } = (0,external_react_.useState)('');
  const {
    0: startCursor,
    1: setStartCursor
  } = (0,external_react_.useState)('');
  const {
    0: chosenImgs,
    1: setChosenImgs
  } = (0,external_react_.useState)([]);
  const {
    data,
    loading,
    error,
    fetchMore
  } = (0,client_.useQuery)(client_.gql`
      query getImg($first: Int, $after: String, $last: Int, $before: String) {
    mediaItems(first: $first, after: $after, last: $last, before: $before) {
      nodes {
        databaseId
        id
        mediaItemUrl
        sourceUrl(size: MEDIUM)
      }
      pageInfo {
      hasNextPage
      endCursor
      startCursor
      hasPreviousPage
    }
    }
  }`, {
    variables: {
      first: rows,
      after: null,
      last: null,
      before: null
    },

    onCompleted(data) {
      setEndCursor(data.mediaItems.pageInfo.endCursor);
      setStartCursor(data.mediaItems.pageInfo.startCursor);
    }

  });
  const paginateTemplate = {
    layout: 'RowsPerPageDropdown PrevPageLink NextPageLink',
    RowsPerPageDropdown: options => {
      const dropdownOptions = [{
        label: 5,
        value: 5
      }, {
        label: 10,
        value: 10
      }, {
        label: 20,
        value: 20
      }, {
        label: 50,
        value: 50
      }, {
        label: 80,
        value: 80
      }];

      const itemsQuantityChange = e => {
        setRows(e.value);
      };

      return (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [(0,jsx_runtime_.jsxs)("span", {
          className: "mx-1",
          style: {
            color: 'var(--text-color)',
            userSelect: 'none'
          },
          children: ["\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435:", ' ']
        }), jsx_runtime_.jsx(dropdown_.Dropdown, {
          className: "mr-3 mt-3",
          value: rows,
          options: dropdownOptions,
          onChange: itemsQuantityChange
        })]
      });
    },
    PrevPageLink: options => {
      const pagePrevHandler = () => {
        fetchMore({
          variables: {
            first: null,
            after: null,
            last: rows,
            before: startCursor
          },

          updateQuery(prev, {
            fetchMoreResult
          }) {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              mediaItems: {
                nodes: [...fetchMoreResult.mediaItems.nodes],
                pageInfo: fetchMoreResult.mediaItems.pageInfo
              }
            });
          }

        });
      };

      return jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: jsx_runtime_.jsx(button_.Button, {
          icon: "pi pi-angle-left",
          className: "mr-10 mt-3",
          onClick: pagePrevHandler,
          disabled: !data?.mediaItems.pageInfo.hasPreviousPage
        })
      });
    },
    NextPageLink: () => {
      const pageNextHandler = () => {
        fetchMore({
          variables: {
            first: rows,
            after: endCursor,
            last: null,
            before: null
          },

          updateQuery(prev, {
            fetchMoreResult
          }) {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              mediaItems: {
                nodes: [...fetchMoreResult.mediaItems.nodes],
                pageInfo: fetchMoreResult.mediaItems.pageInfo
              }
            });
          }

        });
      };

      return jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: jsx_runtime_.jsx(button_.Button, {
          icon: "pi pi-angle-right",
          className: "mt-3",
          style: {
            marginLeft: '10px'
          },
          onClick: pageNextHandler,
          disabled: !data?.mediaItems.pageInfo.hasNextPage
        })
      });
    }
  };

  const sendChosenImgHandler = () => {
    const chosenImgsData = chosenImgs.map(img => {
      return {
        id: img.databaseId,
        alt_text: '',
        src: img.mediaItemUrl
      };
    });
    onChoose(chosenImgsData);
    setVisible(false);
  };

  const footerContent = (0,jsx_runtime_.jsxs)("div", {
    style: {
      paddingTop: '20px'
    },
    children: [jsx_runtime_.jsx(button_.Button, {
      icon: "pi pi-times",
      className: "p-button-text",
      label: "\u041E\u0442\u043C\u0435\u043D\u0430",
      onClick: () => {
        setVisible(false);
        setChosenImgs([]);
        onChoose([]);
      }
    }), jsx_runtime_.jsx(button_.Button, {
      icon: "pi pi-check",
      label: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
      onClick: sendChosenImgHandler
    })]
  });

  const chooseImgHandler = (e, item) => {
    let index = chosenImgs.findIndex(img => img.id === item.id);

    if (index !== -1) {
      setChosenImgs(prev => {
        const newImgArr = [...prev];
        newImgArr.splice(index, 1);
        return newImgArr;
      });
      return;
    }

    setChosenImgs(prev => [...prev, item]);
  };

  return (0,jsx_runtime_.jsxs)("div", {
    className: "my-3",
    children: [jsx_runtime_.jsx(button_.Button, {
      label: "\u0418\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
      onClick: () => setVisible(true)
    }), (0,jsx_runtime_.jsxs)(MalikDialog, {
      visible: visible,
      footer: footerContent,
      onHide: () => setVisible(false),
      children: [jsx_runtime_.jsx("h1", {
        children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"
      }), (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-wrap",
        children: [loading && jsx_runtime_.jsx("div", {
          style: {
            width: '100%',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          children: jsx_runtime_.jsx(progressspinner_namespaceObject.ProgressSpinner, {})
        }), !loading && data?.mediaItems.nodes.map(item => {
          let chosen = chosenImgs.find(img => img.id === item.id);
          if (item.mediaItemUrl.endsWith('.mov') || item.mediaItemUrl.endsWith('.mp4')) return jsx_runtime_.jsx("div", {
            style: {
              width: '100px',
              height: '100px',
              border: '1px solid #aaa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            },
            className: "m-2",
            children: jsx_runtime_.jsx("p", {
              children: "\u0412\u0438\u0434\u0435\u043E"
            })
          }, item.id);
          return jsx_runtime_.jsx("div", {
            onClick: e => chooseImgHandler(e, item),
            style: {
              padding: '5px',
              border: `3px solid ${chosen ? '#6366F1' : 'transparent'}`,
              borderRadius: '10px'
            },
            className: "m-2",
            children: jsx_runtime_.jsx("img", {
              width: 100,
              height: 100,
              style: {
                objectFit: 'cover'
              },
              src: item.sourceUrl,
              alt: item.mediaItemUrl
            })
          }, item.id);
        })]
      }), jsx_runtime_.jsx(paginator_namespaceObject.Paginator, {
        template: paginateTemplate,
        first: first,
        rows: rows,
        totalRecords: 1200,
        className: "justify-content-start"
      })]
    })]
  });
}

/* harmony default export */ const components_ImgChoose = (ImgChoose);

const MalikDialog = /*#__PURE__*/base_default()(dialog_namespaceObject.Dialog,  true ? {
  target: "e16vzec50"
} : 0)({
  width: '80vw',
  [mediaQueries/* devices.mobileL */.H.mobileL]: {
    width: '100vw',
    height: '100%',
    h1: {
      fontSize: '1.5rem'
    },
    img: {
      width: '50px',
      height: '50px'
    },
    button: {
      span: {
        fontSize: '0.8rem'
      }
    }
  }
},  true ? "" : 0);
// EXTERNAL MODULE: ./lib/apollo-client.js
var apollo_client = __webpack_require__(7513);
// EXTERNAL MODULE: ./lib/queries.js
var queries = __webpack_require__(1366);
;// CONCATENATED MODULE: ./pages/addnew.tsx










function Addnew({
  categories,
  attributes,
  sku
}) {
  const {
    0: uploadedImages,
    1: setUploadedImages
  } = (0,external_react_.useState)([]);
  const {
    0: showFrom,
    1: setShowForm
  } = (0,external_react_.useState)(false);

  const setImageHandler = data => {
    setUploadedImages(() => data);
    setShowForm(() => true);
  };

  const setChosenImgsHandler = data => {
    data.length === 0 ? setShowForm(() => false) : setShowForm(() => true);
    setUploadedImages(() => data);
  };

  return (0,jsx_runtime_.jsxs)(Layout/* default */.Z, {
    children: [jsx_runtime_.jsx("h1", {
      className: "my-3",
      children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0435"
    }), jsx_runtime_.jsx("h2", {
      className: "my-3",
      children: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F"
    }), jsx_runtime_.jsx(ImgUpload, {
      onUpload: setImageHandler
    }), jsx_runtime_.jsx(components_ImgChoose, {
      onChoose: setChosenImgsHandler
    }), jsx_runtime_.jsx(fieldset_namespaceObject.Fieldset, {
      className: "mt-3",
      children: uploadedImages.length ? (0,jsx_runtime_.jsxs)("p", {
        children: ["\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ", uploadedImages.length, " \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439"]
      }) : jsx_runtime_.jsx("p", {
        children: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B"
      })
    }), showFrom && jsx_runtime_.jsx(components_NewProductForm, {
      categories: categories,
      sku: sku,
      attributes: attributes,
      images: uploadedImages
    })]
  });
}
async function getStaticProps() {
  const client = (0,apollo_client/* initializeApollo */["in"])();
  const {
    data: all_cvet
  } = await client.query({
    query: queries.ALL_CVET
  });
  const {
    data: all_size
  } = await client.query({
    query: queries.ALL_SIZES
  });
  const {
    data: categories
  } = await client.query({
    query: queries.ALL_PRODUCTS_CATEGORIES
  });
  return {
    props: {
      categories: categories.productCategories.nodes,
      attributes: {
        pa_cvet: all_cvet.allPaCvet.nodes,
        pa_size: all_size.allPaSize.nodes
      }
    },
    revalidate: 60
  };
}

/***/ }),

/***/ 9114:
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ 4394:
/***/ ((module) => {

module.exports = require("@apollo/client/link/error");

/***/ }),

/***/ 7596:
/***/ ((module) => {

module.exports = require("@apollo/client/utilities");

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

/***/ 6330:
/***/ ((module) => {

module.exports = require("deepmerge");

/***/ }),

/***/ 113:
/***/ ((module) => {

module.exports = require("lodash/isEqual");

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

/***/ 5083:
/***/ ((module) => {

module.exports = require("primereact/tag");

/***/ }),

/***/ 333:
/***/ ((module) => {

module.exports = require("primereact/toast");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [597,61,38,670,513,366], () => (__webpack_exec__(4266)));
module.exports = __webpack_exports__;

})();