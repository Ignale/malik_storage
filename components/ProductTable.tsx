import { DefData, ReatailOffers, Variation, productWithVariation } from '@/types/appProps'
import Image from 'next/image'
import * as xlsx from 'xlsx'
import useSWRMutation from 'swr/mutation'
import HeaderTemplate from './tableTemplates/HeaderTemplate'
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { forwardRef, useEffect, useRef, useState } from 'react';
import imgPlaceholder from '../public/img/placeholder-800x800.png'
import { actHistory, actObj } from '@/types/authTypes';
import { DataTable, DataTableRowToggleEvent, DataTableExpandedRows, DataTableRowEditCompleteEvent, DataTableValue } from 'primereact/datatable';
import { ColumnEditorOptions } from 'primereact/column';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import MalikPaginator from './tableTemplates/MalikPaginator';
import { OfferToUpdate } from '@/types/appProps';
import styled from '@emotion/styled';
import { devices } from '@/lib/mediaQueries';
import { getUser } from '@/session/SessionProvider'
import moreButtonTemplate from './tableTemplates/moreButtonTemplate';
import Sceleton from './tableTemplates/Sceleton';
import { TieredMenu } from 'primereact/tieredmenu'
import { InputText } from 'primereact/inputtext'
import ChangePricesModal from './ChangePricesModal'

async function updateInventory(url: string, { arg }: { arg: OfferToUpdate }) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(arg),
  };
  try {
    const response = await fetch(url, requestOptions)
    if (response.ok) {
      return response.json()
    }
  } catch (err) {
    console.log(err)
    throw err
  }

}



// async function createProductCRM(url: string, { arg }: { arg: { product: productWithVariation, variation: Variation } }) {
//   const requestOptions = {
//     method: 'POST',
//     body: JSON.stringify(arg),
//   };
//   try {
//     const response = await fetch(url, requestOptions)
//     if (response.ok) {
//       return response.json()
//     }
//   } catch (err) {
//     console.log(err)
//     return err
//   }

// }

type ProductTableProps = {
  products?: productWithVariation[]
  retData?: ReatailOffers
  defData?: DefData[]
  loading: boolean
}

export default function ProductTable({ products, retData, defData, loading }: ProductTableProps) {

  const toast = useRef<Toast>(null);

  const menu = useRef(null);

  const [globalFilter, setGlobalFilter] = useState('')

  const [tableProducts, setTableProducts] = useState<productWithVariation[] | []>([])

  const [retailTableData, setRetailTableData] = useState<ReatailOffers | undefined>(() => retData)

  const [defectTableData, setDefectTableData] = useState<DefData[] | undefined>(() => defData)

  const [visibleBatchModal, setVisibleBatchModal] = useState<boolean>(false)

  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | any[]>([]);

  const { user } = getUser()

  useEffect(() => {
    if (loading) {
      setTableProducts(() => [])
    }
    setTableProducts(() => products!)
    setRetailTableData(() => retData)
  }, [loading])


  const expandAll = () => {
    let _expandedRows: {
      [key: string]: boolean;
    } = {};

    Object.values(tableProducts!).forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const { trigger } = useSWRMutation(`/api/sync`, updateInventory, {
    onError: (err) => {

      toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: err.message, life: 3000 })
    },
    onSuccess: (data) => {
      console.log(data)
      const retOfResp = JSON.parse(data.ret.offer)
      const retPrResp = JSON.parse(data.ret.price)
      console.log({ retOfResp, retPrResp })
      if (retPrResp.success && retOfResp.success && data.woo) {
        toast.current!.show({ severity: 'success', summary: 'Успешно', detail: 'Данные синхронизированы', life: 3000 })
      } else {
        toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: "Ошибка синхронизации", life: 3000 })
      }
    },
    revalidate: true
  })


  // const { trigger: createTrigger } = useSWRMutation(`/api/createInCRM`, createProductCRM, {
  //   onError: (err) => {
  //     console.log(err)
  //     toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: err.message, life: 3000 })
  //   },
  //   onSuccess: (data) => {
  //     console.log(data)
  //     // const retResp = JSON.parse(data)
  //     // if (retResp.success && data.woo) {
  //     //   toast.current!.show({ severity: 'success', summary: 'Успешно', detail: 'Данные синхронизированы', life: 3000 })
  //     // } else {
  //     //   console.log(data)
  //     //   toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: "Ошибка синхронизации", life: 3000 })
  //     // }
  //   },
  //   revalidate: true
  // })

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {

    let { newData, index, data } = e

    const defQuantity = defectTableData?.find(data => data.databaseId === newData.databaseId);
    const defQindex = defectTableData?.findIndex(data => data.databaseId === newData.databaseId);

    if (defQuantity && defQuantity.defectQuantity !== 0) { //проверяем на наличие дефектов
      if (newData.stockQuantity !== data.stockQuantity) { // проверяем было ли измненено количество платьев
        defQuantity!.fullQuantity = newData.stockQuantity + defQuantity.defectQuantity // обновляем общее количество товаров, включая брак
      } else {
        newData.stockQuantity = defQuantity.fullQuantity - defQuantity.defectQuantity
      }

    } else if (defQuantity && defQuantity.defectQuantity === 0) {// если дефектов нет 
      setDefectTableData((prev) => [...prev!].splice(defQindex!, 1)) // удаляем запись о дефектах
    }

    const retQuantity = retailTableData?.offers.find(offer => offer.xmlId == newData.sku)?.quantity

    const retailCount = retailTableData?.offers.find(offer => offer.xmlId == newData.sku)

    let parentIndex = Object.values(tableProducts!).findIndex((product) => product.variations.nodes.find((variation) => variation.sku === e.data.sku))

    setTableProducts((prev) => {
      const newProdData = structuredClone(prev!)
      newProdData[parentIndex].variations.nodes[index] = newData as Variation
      return newProdData
    }
    )

    setRetailTableData(({ ...prev }) => {
      const newRetailData = { ...prev }
      newRetailData.offers = newRetailData.offers?.map(offer => {
        if (offer.xmlId == newData.sku) {
          offer.quantity = newData.stockQuantity
        }
        return offer
      })
      return newRetailData
    })

    const createActionArr = (prevData: DataTableValue, newData: DataTableValue) => {
      console.log({ prevData, newData })
      const actionArr = [] as actObj[]
      const keys = ['price', 'stockQuantity']
      keys.forEach(key => {
        let actObj = {} as actObj
        if (newData[key] !== prevData[key]) {
          actObj.objName = key
          actObj.prevValue = prevData[key]
          actObj.newValue = newData[key]
          actionArr.push(actObj)
        }
      })
      return actionArr
    }
    const actionArr = createActionArr(data, newData)

    const args = {
      productId: tableProducts![parentIndex].productId,
      variationId: newData.databaseId,
      count: newData.stockQuantity,
      retailId: retailCount?.id,
      xmlId: newData.sku,
      newPrice: newData.price,
      defectData: defectTableData,
      history: {
        actionDate: new Date().toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
        actionArr,
        actionType: 'change',
        sku: newData.sku,
        changeMaker: user,
      } as actHistory
    }

    // retQuantity !== undefined ?
    trigger<OfferToUpdate>(args)
    // createTrigger<{ product: productWithVariation, variation: OfferToUpdate }>({ product: tableProducts![parentIndex], variation: newData as Variation })
  };


  const numberEditor = (options: ColumnEditorOptions) => {
    return <InputNumber value={options.value} size={5} onValueChange={(e) => options.editorCallback?.(e.value)} />;
  };

  const searchHandler = (e: React.BaseSyntheticEvent) => {
    const value = e.target.value;
    setGlobalFilter(value);
  }

  const saveLocally = async () => {
    try {
      const res = await fetch('/api/saveLocal', {
        method: "POST",
        body: JSON.stringify(tableProducts)
      })
      if (!res.ok) {
        throw new Error('somethin went wrong')
      }
      const data = await res.json()
      toast.current!.show({ severity: 'success', summary: 'Успешно', detail: data.message, life: 3000 })
    } catch (error) {
      console.log(error)
    }
  }

  const exportCSV = () => {
    const obejctToExport = [] as any
    tableProducts.forEach((product) => product.variations.nodes.forEach((variation) => (obejctToExport.push({ 'Название': variation.name, 'Артикул': variation.sku, 'Количество в CRM': variation.stockQuantity }))))
    console.log(obejctToExport)
    const worksheet = xlsx.utils.json_to_sheet(obejctToExport);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    xlsx.writeFile(workbook, "DataSheet.xlsx");
  }
  const createSKUs = async () => {
    const productsIds = new Map
    for (let product of tableProducts) {
      for (const variation of product.variations.nodes) {
        if (!variation.sku) {
          productsIds.set(product.productId, [...product.variations.nodes.map(node => node.databaseId)])
        }
      }
    }
    const prJ = Object.fromEntries(productsIds)
    console.log(prJ)
    console.log(productsIds)
    try {
      const res = await fetch('/api/createAllSku', {
        method: "POST",
        body: JSON.stringify(prJ)
      })
      if (!res.ok) {
        throw new Error('somethin went wrong')
      }
      const data = await res.json()
      toast.current!.show({ severity: 'success', summary: 'Успешно', detail: data.message, life: 3000 })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCustomerDuplicates = async () => {
    try {
      const res = await fetch('/api/deleteCustomerDuplicates')
      if (!res.ok) {
        throw new Error('error')
      }
      const data = await res.json()
      console.log(data)
      if (data.success) {
        toast.current!.show({ severity: 'success', summary: 'Успешно', detail: data.message, life: 3000 })
      }
    } catch (error) {
      console.log(error)
      toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: 'Error', life: 3000 })
    }
  }

  const fixExternalId = async () => {
    try {
      const res = await fetch('/api/fixExternalId')
      if (!res.ok) {
        throw new Error('error')
      }
      const data = await res.json()
      console.log(data)
      if (data.success) {
        toast.current!.show({ severity: 'success', summary: 'Успешно', detail: data.message, life: 3000 })
      }
    } catch (error) {
      console.log(error)
      toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: 'Error', life: 3000 })
    }
  }

  const uploadToGoogle = async () => {
    try {
      const res = await fetch('/api/uploadToApiSheets')
      if (!res.ok) {
        throw new Error('error')
      }
      const data = await res.json()
      if (data.success) {
        toast.current!.show({ severity: 'success', summary: 'Успешно', detail: data.message, life: 3000 })
      }
    } catch (error) {
      console.log(error)
      toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: 'Error', life: 3000 })
    }
  }

  const lookTable = async () => {
    try {
      const res = await fetch('/api/feedFromSheet')
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }



  const getStockSeverity = (rowData: Variation) => {
    switch (rowData.stockStatus) {
      case 'IN_STOCK':
        if (rowData.stockQuantity! === 0 || rowData.stockQuantity === null) return 'danger'
        if (rowData.stockQuantity! <= 3) return 'warning'
        return 'success'
      case 'OUT_OF_STOCK':
        if (rowData.stockQuantity! === 0 || rowData.stockQuantity === null) return 'danger'
        if (rowData.stockQuantity! <= 3) return 'warning'
        if (rowData.stockQuantity! >= 3) return 'success'
        return 'danger'
      default:
        return null
    }
  }
  const getStockQuantitySeverity = (quantity: Variation['stockQuantity']) => {
    if (quantity === null || quantity === 0) return 'danger'
    if (quantity < 4) return 'warning'
    return 'success'
  }

  const imageBodyTemplate = (rowData: Variation) => {
    return <Image style={{ objectFit: 'cover' }} className="shadow-4" width={50} height={70} src={rowData.featuredImage ? rowData.featuredImage.node.sourceUrl : imgPlaceholder} alt={rowData.name} />;
  };

  const stockQuantityTemplate = (rowData: Variation) => {

    const stockQuantity = rowData.stockQuantity ? rowData.stockQuantity : 0

    return (<Tag value={stockQuantity} severity={getStockQuantitySeverity(rowData.stockQuantity)} ></Tag>)
  }

  const stockStatusTemplate = (rowData: Variation) => (<Tag value={(rowData.stockQuantity! > 0 && rowData.stockQuantity! <= 3) ? 'Мало' :
    (rowData.stockQuantity! > 3) ? 'В наличии' :
      'Нет в наличии'} severity={getStockSeverity(rowData)} ></Tag>)

  const defectTemplate = (rowData: Variation) => {
    console.log(defectTableData)
    console.log(rowData)
    const quantity = defectTableData && defectTableData[defectTableData.findIndex(data => data.databaseId === rowData.databaseId)]?.defectQuantity
    return (quantity ?? 0)
  }

  const defectQuantityEditor = (options: ColumnEditorOptions) => {
    console.log(options)
    const editHandler = (e: InputNumberChangeEvent) => {
      console.log('edit')
      setDefectTableData((prev) => {
        const newDefectData = prev ? [...prev!] : []
        let newDefectDataIndex = newDefectData.findIndex((data) => data.databaseId === options.rowData.databaseId)
        if (newDefectDataIndex !== -1) {
          newDefectData[newDefectDataIndex].defectQuantity = e.value!
          return newDefectData
        }
        newDefectData.push({
          databaseId: options.rowData.databaseId,
          fullQuantity: options.rowData.stockQuantity,
          defectQuantity: e.value!
        })
        return newDefectData
      })
    }
    return <InputNumber size={1} onChange={editHandler} />
  }

  const retailQuantityTemplate = (rowData: Variation) => {

    const quantity = retailTableData?.offers.find(offer => offer.xmlId == rowData.sku)?.quantity

    const value = quantity !== undefined ? quantity : 'Нет в системе'
    return (
      <Tag severity={(quantity !== rowData.stockQuantity && rowData.stockQuantity !== null) ? 'warning' : 'info'} value={value}></Tag>)
  }

  const skuTemplate = (rowData: Variation) => {
    return rowData.sku
  }


  const rowExpansionTemplate = (data: productWithVariation) => {
    return (
      <div className="p-3">
        <h4 className='mb-4'>Вариации для {data.name}</h4>
        <DataTable maxLength={20} dataKey='id' editMode='row' onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} value={data.variations.nodes}>
          <Column style={{ width: '10%' }} field="featuredImage" header="Изображение" body={imageBodyTemplate}></Column>
          <Column style={{ width: '20%' }} field="name" body={(rowData: Variation) => rowData.name + ` (id: ${rowData.databaseId})`} header="Название" sortable></Column>
          <Column style={{ width: '15%' }} field="stockStatus" header="Наличие" sortable body={stockStatusTemplate}></Column>
          <Column style={{ width: '15%' }} field="stockQuantity" editor={user?.role === 'admin' ? numberEditor : false} header="Кол-во в магазине" body={stockQuantityTemplate} sortable></Column>
          <Column style={{ width: '10%' }} field="price" editor={(user?.role === 'admin' || 'manager') ? numberEditor : false} header="Цена" sortable></Column>
          <Column style={{ width: '10%' }} header='Кол-во в CRM' body={retailQuantityTemplate}>
          </Column>
          <Column style={{ width: '10%' }} header='SKU' body={skuTemplate}>
          </Column>
          <Column style={{ width: '10%' }} field='defect_quantity' header='Брак' editor={user?.role === 'admin' ? defectQuantityEditor : false} body={defectTemplate}>
          </Column>
          {user && user?.role !== 'user' &&
            <Column style={{ width: '10%' }} rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>}
          {user && user?.role !== 'user' &&
            <Column style={{ width: '10%' }} headerStyle={{ width: '10%', minWidth: '8rem' }} body={moreButtonTemplate} >
            </Column>}

        </DataTable>
      </div>
    )
  }

  return (
    loading ? <Sceleton /> :
      <>
        <Toast ref={toast} />
        <ChangePricesModal setVisibleBatchModal={setVisibleBatchModal} visibleBatchModal={visibleBatchModal} tableProducts={tableProducts} toast={toast} />
        <MalikDataTable value={tableProducts} editMode='row' onRowToggle={(e: DataTableRowToggleEvent) => setExpandedRows(e.data)}
          expandedRows={expandedRows} rowExpansionTemplate={rowExpansionTemplate}
          filterDisplay="menu" globalFilter={globalFilter} globalFilterFields={['name', 'variations.nodes.name']}
          dataKey="id" header={<div className='flex justify-content-between'>
            <MalikInputText className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText onChange={searchHandler} style={{ width: '100%' }} placeholder="Поиск" />
            </MalikInputText>
            <HeaderTemplate exportCSV={exportCSV} lookTable={lookTable} uploadToGoogle={uploadToGoogle} createSKUs={createSKUs} deleteCustomerDuplicates={deleteCustomerDuplicates} fixExternalId={fixExternalId} showBatchChangePricesPopup={setVisibleBatchModal} tableProducts={tableProducts} saveLocally={saveLocally} ref={menu} />
          </ div>}>

          <Column expander style={{ width: '3em' }} />
          <Column field="name" body={(rowData: productWithVariation) => (
            <>
              <a style={{ fontWeight: 600 }} href={`${rowData.link}`}>
                {rowData.name}
              </a>
            </>
          )} header="Название" />
          <Column body={(rowData: productWithVariation) => rowData.variations.nodes.reduce((acc, curr) => acc + (curr.stockQuantity === null ? 0 : curr.stockQuantity), 0)} header="Количество" />

        </MalikDataTable>
      </>

  )
}


const MalikDataTable = styled(DataTable)({
  minWidth: '20rem'
})

const MalikButtonExpantion = styled(Button)({
  [devices.mobileL]: {
    fontSize: '0!important'
  }
})

const MalikInputText = styled('div')({
  width: '50%',
  [devices.mobileL]: {
    width: '100%!important'
  }
})

