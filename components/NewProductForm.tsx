import { Fieldset } from 'primereact/fieldset'
import React, { useRef, useState } from 'react'
import { WooProduct, UploadData, WooProductVariation, WooProductCategory, WooProductAttributes, wooImage } from '../types/appProps'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from 'primereact/multiselect';
import { Divider } from 'primereact/divider';
import { useFormik } from 'formik'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import * as crypto from 'crypto';

type NewProductFormProps = {
  images: UploadData[]
  categories: WooProductCategory
  attributes: WooProductAttributes
  sku: string
}


const initialVariation: WooProductVariation = {
  regular_price: '',
  id: Math.random().toString(36),
  sku: '',
  image: {} as wooImage,
  stock_quantity: null,
  stock_status: 'instock',
  attributes: [],
  manage_stock: true,
  dimensions: {
    length: '290',
    width: '390',
    height: '90'
  },
  weight: '1000',
}

function NewProductForm({ sku, images, categories, attributes }: NewProductFormProps) {

  const [cat, setCat] = useState(null)

  const toast = useRef<Toast>(null)

  const formik = useFormik<WooProduct>({
    initialValues: {
      name: '',
      type: 'variable',
      categories: [],
      images: [],
      variations: [initialVariation],
      meta_data: [{
        key: 'product_description',
        value: '',
      },
      {
        key: 'product_care',
        value: '',

      }, {
        key: 'product_measurements',
        value: 'test',
      }, {
        key: 'model_measurements',
        value: '',

      },
      {
        key: "shipping",
        value: '',

      },
      ],
      sku: crypto.randomBytes(4).toString('hex').toUpperCase(),
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
      weight: '1000',

    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      try {
        const res = await fetch('/api/createProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        if (res.status === 200) {
          const data = await res.json()
          console.log(data)
          toast.current!.show({ severity: 'success', summary: 'Успешно', detail: 'Товар создан', life: 3000 });
          setSubmitting(false)
          resetForm()
        } else {
          const data = await res.json()
          console.log(data)
          toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: 'Товар не создан', life: 3000 });
          setSubmitting(false)
          resetForm()
        }
      } catch (e) {
        console.log(e)
        toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: 'Товар не создан', life: 3000 });
        setSubmitting(false)
        resetForm()
      }

    }
  })

  console.log(formik.values)

  formik.initialValues.images = images

  const imageOptionTemplate = (option: UploadData) => {
    return (
      <div className="flex align-items-center">
        <img width={50} height={50} style={{ objectFit: 'cover' }} src={option?.src} alt={option?.alt_text} />
        <span>{option?.alt_text}</span>
      </div>
    );
  }

  const imageTemplate = (index: number) => {
    const option = formik.values.variations[index].image
    if (option.src) {
      return (
        <div className="flex align-items-center">
          <img width={50} height={50} style={{ objectFit: 'cover' }} src={option.src} alt={option.alt_text} />
          <span>{option.alt_text}</span>
        </div>
      );
    }
    return <span>Выберите изображение</span>

  }

  const metaDataHandler = (e: React.BaseSyntheticEvent) => {
    const key = e.target.id
    const value = e.target.value
    const index = formik.values.meta_data.findIndex((item) => item.key === key)
    formik.setFormikState((state) => ({
      ...state, values: {
        ...state.values, meta_data: [...state.values.meta_data.slice(0, index), { ...state.values.meta_data[index], value: value }, ...state.values.meta_data.slice(index + 1)]
      }
    }))
  }

  const variationImageHandler = (e: DropdownChangeEvent, index: number) => {
    console.log(e.value)
    formik.setFormikState((state) => {
      const newVariations = [...state.values.variations]
      newVariations[index].image = e.value
      return {
        ...state, values: {
          ...state.values, variations: newVariations
        }
      }
    })
  }

  const variationPriceHandler = (e: InputNumberChangeEvent, index: number) => {
    const key = (e.originalEvent.target as HTMLInputElement).id as string
    const value = e.value
    formik.setFormikState((state) => {
      const newVariations = [...state.values.variations]
      newVariations[index] = { ...state.values.variations[index], regular_price: value?.toString() + '.00' }
      return {
        ...state, values: {
          ...state.values, variations: newVariations
        }
      }
    })
  }

  const variationQuantityHandler = (e: InputNumberChangeEvent, index: number) => {
    const key = (e.originalEvent.target as HTMLInputElement).id as string
    const value = e.value
    formik.setFormikState((state) => {
      const newVariations = [...state.values.variations]
      newVariations[index] = { ...state.values.variations[index], stock_quantity: value }
      return {
        ...state, values: {
          ...state.values, variations: newVariations
        }
      }
    })
  }

  const attrTemplate = (index: number, optionId: number) => (
    formik.values.variations[index].attributes[formik.values.variations[index].attributes.findIndex((att) => att.id === optionId)]?.option
  )

  const attributeHandler = (e: DropdownChangeEvent, index: number) => {
    console.log({ e, index })
    const id = e.target.id === 'pa_cvet' ? 6 : 7
    const option = e.value
    const attVarIndex = formik.values.variations[index].attributes.findIndex((att) => att.id === id)
    const attrIndex = formik.values.attributes.findIndex((att) => att.id === id)
    formik.setFormikState((state) => {
      const newVariations = [...state.values.variations]
      let newAttr = [...state.values.attributes]
      let newDefAttr = [...state.values.default_attributes]

      newVariations[index].attributes = [...newVariations[index].attributes.slice(0, attVarIndex), { id: id, slug: e.target.id, name: e.target.id === 'pa_cvet' ? "Color" : "Size", option: option.name }, ...newVariations[index].attributes.slice(attVarIndex + 1)]

      newDefAttr = [...newDefAttr.slice(0, attrIndex), { id: id, name: e.target.id === 'pa_cvet' ? "Color" : "Size", option: option.name }, ...newDefAttr.slice(attrIndex + 1)]

      newAttr = [...newAttr.slice(0, attrIndex), {
        id: id, slug: e.target.id, name: e.target.id === 'pa_cvet' ? "Color" : "Size", visible: true, position: 0, variation: true,
        options: newAttr[attrIndex] ? [...newAttr[attrIndex].options, option.name] : [option.name]
      }, ...newAttr.slice(attrIndex + 1)]

      newVariations[index].sku = `${formik.values.sku}-${newVariations[index].attributes.map((att) => att.option?.slice(0, 2)).join('')}`

      return {
        ...state, values: {
          ...state.values, attributes: newAttr, variations: newVariations
        }
      }
    })
  }


  return (
    <Fieldset className='my-3'>
      <Toast ref={toast}></Toast>
      <form onSubmit={formik.handleSubmit} id='newProductForm' className='flex flex-column gap-5' action="sumbit">
        <Divider>
          <div className="inline-flex align-items-center">
            <i className="pi pi-id-card mr-2"></i>
            <b>Основные данные</b>
          </div>
        </Divider>
        <div className='flex flex-1 flex-column gap-1'>
          <label htmlFor="name">Название платья</label>
          <InputText value={formik.values.name} name='name' onChange={formik.handleChange} id='name' />
        </div>
        <div className="flex flex-column md:flex-row gap-3">
          <div className='flex flex-column flex-1 gap-1'>
            <label className='mr-3' htmlFor="regular_price">Цена</label>
            <div className='p-inputgroup  flex-1'>
              <span className="p-inputgroup-addon">₽</span>
              <InputNumber value={formik.values.regular_price} onChange={(e) => { formik.setFieldValue('regular_price', e.value?.toFixed(2)) }} placeholder='Цена' id='regular_price' />
              <span className="p-inputgroup-addon">.00</span>
            </div>
          </div>
          <div className='flex flex-column flex-1 gap-1'>
            <label className='mr-3' htmlFor="sku">Артикул</label>
            <div className='p-inputgroup flex-1'>
              <span className="p-inputgroup-addon">#</span>
              <InputText disabled value={formik.values.sku} id='sku' />
            </div>
          </div>

        </div>
        {/* <div className="flex flex-column md:flex-row align-items-center gap-3">
          <div className='flex flex-1 gap-1'>
            <label className='mr-3' htmlFor="on_sale">Распродажа</label>
            <Checkbox checked={formik.values.on_sale!} name='on_sale' onChange={formik.handleChange} id='on_sale' />
          </div>
          {formik.values.on_sale &&
            <div className='flex flex-column flex-1 gap-1'>
              <label className='mr-3' htmlFor="sale_price">Цена распродажи</label>
              <div className='p-inputgroup flex-1'>
                <span className="p-inputgroup-addon">₽</span>
                <InputNumber value={Number(formik.values.sale_price)} name='sale_price' onChange={(e) => { formik.setFieldValue('sale_price', e.value?.toString() + '.00') }} id='sale_price' />
                <span className="p-inputgroup-addon">.00</span>
              </div>
            </div>}
        </div>
        {formik.values.on_sale &&
          <div className="flex flex-column md:flex-row align-items-center gap-3">
            <div className='flex flex-1 flex-column gap-1'>
              <label className='mr-3' htmlFor="name">Дата начала распродажи</label>
              <Calendar value={formik.values.date_on_sale_from!} showTime hourFormat="24" dateFormat='yy-mm-dd' showIcon onChange={(e) => formik.setFieldValue('date_on_sale_from', e.target.value)} id='date_on_sale_from' />
            </div>
            <div className='flex flex-column flex-1 gap-1'>
              <label className='mr-3' htmlFor="name">Дата окончания распродажи</label>
              <Calendar value={formik.values.date_on_sale_to!} showTime hourFormat="24" dateFormat='yy-mm-dd' showIcon onChange={(e) => formik.setFieldValue('date_on_sale_to', e.target.value)} id='date_on_sale_to' />
            </div>
          </div>
        } */}
        <MultiSelect value={cat} id='categories' onChange={(e) => {
          setCat(e.value)
          formik.setFormikState((prev) => {
            const newVal = [...e.value].map((val) => ({ id: val.databaseId }))
            console.log(newVal)
            console.log([...e.value])

            return (
              {
                ...prev, values: {
                  ...prev.values, categories: [...newVal]
                }
              })
          })
        }} options={categories} optionLabel="name" display="chip"
          placeholder="Выберите категории" maxSelectedLabels={10} className="w-full" />
        <div className="flex md:flex-row flex-column gap-3">
          <div className='flex flex-1 flex-column gap-1'>
            <label htmlFor="product_description">Описание</label>
            <InputTextarea value={formik.values.meta_data[formik.values.meta_data.findIndex((met) => met.key === 'product_description')].value} onChange={metaDataHandler} rows={5} cols={30} id='product_description' />
          </div>
          <div className='flex flex-1  flex-column gap-1'>
            <label htmlFor="product_care">Уход</label>
            <InputTextarea value={formik.values.meta_data[formik.values.meta_data.findIndex((met) => met.key === 'product_care')].value} onChange={metaDataHandler} rows={5} cols={30} id='product_care' />
          </div>
        </div>
        <div className="flex md:flex-row flex-column gap-3">
          <div className='flex flex-1  flex-column gap-1'>
            <label htmlFor="product_measurements">Размеры платья</label>
            <InputTextarea value={formik.values.meta_data[formik.values.meta_data.findIndex((met) => met.key === 'product_measurements')].value} onChange={metaDataHandler} rows={5} cols={30} id='product_measurements' />
          </div>
          <div className='flex flex-1  flex-column gap-1'>
            <label htmlFor="model_measurements">Размеры модели</label>
            <InputTextarea value={formik.values.meta_data[formik.values.meta_data.findIndex((met) => met.key === 'model_measurements')].value} onChange={metaDataHandler} rows={5} cols={30} id='model_measurements' />
          </div>
        </div>
        <div className="flex md:flex-row flex-column gap-3">
          <div className='flex flex-1  flex-column gap-1'>
            <label htmlFor="shipping">Доставка</label>
            <InputTextarea value={formik.values.meta_data[formik.values.meta_data.findIndex((met) => met.key === 'shipping')].value} onChange={metaDataHandler} rows={5} cols={30} id='shipping' />
          </div>
        </div>
        <Divider style={{ marginBottom: '0px' }}>
          <div className="inline-flex align-items-center mb-0">
            <i className="pi pi-th-large mr-2"></i>
            <b>Вариации</b>
          </div>
        </Divider>

        {formik.values.variations.map((variation, index) => (
          <div className='pl-5' key={index}>
            <Divider >
              <p>#{index + 1} Вариация</p>
            </Divider>

            <div className='flex flex-column gap-3'>
              <Dropdown onChange={(e) => variationImageHandler(e, index)} valueTemplate={imageTemplate(index)} id='images' options={formik.values.images} itemTemplate={imageOptionTemplate} placeholder="Выберите изображение" className="w-full" />
              <div className="flex flex-column md:flex-row gap-3">
                <Dropdown value={variation.attributes[variation.attributes.findIndex((attr) => attr.id === 6)]} valueTemplate={attrTemplate(index, 6)} id='pa_cvet' onChange={(e) => attributeHandler(e, index)} options={attributes.pa_cvet} optionLabel="name"
                  placeholder="Выберите цвет" className="w-full " />
                <Dropdown value={variation.attributes[variation.attributes.findIndex((attr) => attr.id === 7)]} valueTemplate={attrTemplate(index, 7)} id='pa_size' onChange={(e) => attributeHandler(e, index)} options={attributes.pa_size} optionLabel="name"
                  placeholder="Выберите размер" className="w-full " />

              </div>
              <div className="flex flex-column sm:flex-row gap-3">
                <div className='p-inputgroup flex-1'>
                  <span className="p-inputgroup-addon">₽</span>
                  <InputNumber value={Number(variation.regular_price)} placeholder='Цена'
                    onChange={(e) => { variationPriceHandler.call(null, e, index) }} inputId='var_regular_price' />
                  <span className="p-inputgroup-addon">.00</span>
                </div>
                <div className='p-inputgroup flex-1'>
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-cart-plus"></i>
                  </span>
                  <InputNumber value={Number(variation.stock_quantity)} onChange={(e) => { variationQuantityHandler.call(null, e, index) }} placeholder='Количество товара' inputId='var_stock_quantity' />
                </div>
                <div className='p-inputgroup flex-1'>
                  <span className="p-inputgroup-addon">#</span>
                  <InputText disabled value={variation.sku} placeholder='Артикул' id='var_sku' />
                </div>
              </div>
              <div className="flex flex-column sm:flex-row gap-3">
                {Object.keys(variation.dimensions).map((key, index) => (
                  <div key={key} className='p-inputgroup flex-1'>
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-box"></i>
                    </span>
                    <InputNumber value={Number(variation.dimensions[key as keyof typeof variation.dimensions])} placeholder={key} id={key} />
                    <span className="p-inputgroup-addon">мм</span>
                  </div>
                ))}
                <div className='p-inputgroup flex-1'>
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-box"></i>
                  </span>
                  <InputNumber placeholder='Вес' value={Number(variation.weight)} id='weight' />
                  <span className="p-inputgroup-addon">гр</span>
                </div>
              </div>
            </div>
          </div>

        ))}
        <div className="flex justify-content-center mt-5">
          <Button type='button' onClick={(e) => {
            e.preventDefault; formik.setFormikState((prev) => ({ ...prev, values: { ...prev.values, variations: [...prev.values.variations, { ...initialVariation, id: Math.random().toString(36) }] } }))
          }} label='Добавить вариацию' icon="pi pi-plus" />
        </div>
        <Divider style={{ marginBottom: '0px' }} />
        <div className="flex justify-content-center mt-3">
          <Button type='submit' label='Сохранить изменения' loading={formik.isSubmitting} icon="pi pi-save" className='p-button-success' />
        </div>

      </form>
    </Fieldset>
  )
}

export default NewProductForm


