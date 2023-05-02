import { ReatailOffers, Variation, productWithVariation } from '@/types/appProps'
import Image from 'next/image'
import useSWRMutation from 'swr/mutation'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useRef, useState } from 'react';
import imgPlaceholder from '../public/img/placeholder-800x800.png'
import { DataTable, DataTableRowToggleEvent, DataTableExpandedRows } from 'primereact/datatable';
import { ColumnEditorOptions } from 'primereact/column';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { OfferToUpdate } from '@/types/appProps';

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

async function createProductCRM(url: string, { arg }: { arg: { product: productWithVariation, variation: OfferToUpdate } }) {
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

type ProductTableProps = {
  products?: productWithVariation[]
  retData?: ReatailOffers
}

export default function ProductTable({ products, retData }: ProductTableProps) {
  const toast = useRef<Toast>(null);


  const [globalFilter, setGlobalFilter] = useState('')

  const [tableProducts, setTableProducts] = useState<productWithVariation[] | undefined>(() => [...products!])

  const [retailTableData, setRetailTableData] = useState<ReatailOffers | undefined>(() => retData)

  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | any[]>([]);

  const expandAll = () => {
    let _expandedRows: {
      [key: string]: boolean;
    } = {};

    Object.values(tableProducts!).forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows([]);
  };

  const { trigger } = useSWRMutation(`/api/sync`, updateInventory, {
    onError: (err) => {
      console.log(err)
      toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: err.message, life: 3000 })
    },
    onSuccess: (data) => {
      const retResp = JSON.parse(data.ret)
      if (retResp.success && data.woo) {
        toast.current!.show({ severity: 'success', summary: 'Успешно', detail: 'Данные синхронизированы', life: 3000 })
      } else {
        toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: "Ошибка синхронизации", life: 3000 })
      }
    },
    revalidate: true
  })
  const { trigger: createTrigger } = useSWRMutation(`/api/createInCRM`, createProductCRM, {
    onError: (err) => {
      console.log(err)
      toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: err.message, life: 3000 })
    },
    onSuccess: (data) => {
      console.log(data)
      // const retResp = JSON.parse(data)
      // if (retResp.success && data.woo) {
      //   toast.current!.show({ severity: 'success', summary: 'Успешно', detail: 'Данные синхронизированы', life: 3000 })
      // } else {
      //   console.log(data)
      //   toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: "Ошибка синхронизации", life: 3000 })
      // }
    },
    revalidate: true
  })

  const onRowEditComplete = (e: any) => {
    let _products: productWithVariation[] = JSON.parse(JSON.stringify(tableProducts))


    console.log(e)// deep copy

    let { newData, index } = e

    const retQuantity = retailTableData?.offers.find(offer => offer.externalId == newData.databaseId)?.quantity

    const retailCount = retailTableData?.offers.find(offer => offer.externalId == newData.databaseId)


    let parentIndex = Object.values(_products).findIndex((product) => product.variations.nodes.find((variation) => variation.databaseId === e.data.databaseId))

    _products[parentIndex].variations.nodes[index] = newData

    setTableProducts((prev) => {
      const newProdData = [...prev!]
      newProdData[parentIndex].variations.nodes[index] = newData
      return newProdData
    }
    )

    setRetailTableData(({ ...prev }) => {
      const newRetailData = { ...prev }
      newRetailData.offers = newRetailData.offers?.map(offer => {
        if (offer.externalId == newData.databaseId) {
          offer.quantity = newData.stockQuantity
        }
        return offer
      })
      return newRetailData
    })

    const args = {
      productId: _products[parentIndex].productId,
      variationId: newData.databaseId,
      count: newData.stockQuantity,
      retailId: retailCount?.id
    }

    retQuantity !== undefined ?
      trigger<OfferToUpdate>(args) :
      createTrigger<{ product: productWithVariation, variation: OfferToUpdate }>({ product: _products[parentIndex], variation: newData })
  };


  const textEditor = (options: ColumnEditorOptions) => {
    return <InputText type="text" value={options.value} style={{ width: '100%' }} onChange={(e) => options.editorCallback?.(e.target.value)} />;
  };

  const numberEditor = (options: ColumnEditorOptions) => {
    return <InputNumber value={options.value} size={5} onValueChange={(e) => options.editorCallback?.(e.value)} />;
  };

  const searchHandler = (e: React.BaseSyntheticEvent) => {
    const value = e.target.value;
    setGlobalFilter(value);
  }

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText onChange={searchHandler} placeholder="Поиск" />
      </span>
      <Button icon="pi pi-plus" onClick={expandAll} label="Расширить все" text />
      <Button icon="pi pi-minus" onClick={collapseAll} label="Свернуть все" text />
    </div>
  )

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

  const getManageStockSeverity = (rowData: Variation) => {
    if (rowData.manageStock === 'TRUE' || rowData.stockQuantity !== null) return 'success'
    return 'warning'
  }

  const imageBodyTemplate = (rowData: Variation) => {
    return <Image style={{ objectFit: 'cover' }} className="shadow-4" width={50} height={70} src={rowData.featuredImage ? rowData.featuredImage.node.sourceUrl : imgPlaceholder} alt={rowData.name} />;
  };

  const stockQuantityTemplate = (rowData: Variation) => (<Tag value={rowData.stockQuantity ? rowData.stockQuantity : 0} severity={getStockQuantitySeverity(rowData.stockQuantity)} ></Tag>)

  const stockStatusTemplate = (rowData: Variation) => (<Tag value={(rowData.stockStatus === 'IN_STOCK' && (rowData.stockQuantity! > 0 && rowData.stockQuantity! <= 3)) ? 'Мало' :
    (rowData.stockQuantity! > 3) ? 'В наличии' :
      'Нет в наличии'} severity={getStockSeverity(rowData)} ></Tag>)


  const retailQuantityTemplate = (rowData: Variation) => {

    const quantity = retailTableData?.offers.find(offer => offer.externalId == rowData.databaseId)?.quantity

    const value = quantity !== undefined ? quantity : 'Нет в системе'
    return (
      <Tag severity={(quantity !== rowData.stockQuantity && rowData.stockQuantity !== null) ? 'warning' : 'info'} value={value}></Tag>)
  }

  const rowExpansionTemplate = (data: productWithVariation) => {
    return (
      <div className="p-3">
        <h4 className='mb-4'>Вариации для {data.name}</h4>
        <DataTable dataKey='id' editMode='row' onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }} value={data.variations.nodes}>
          <Column style={{ width: '10%' }} field="featuredImage" header="Изображение" body={imageBodyTemplate}></Column>
          <Column style={{ width: '20%' }} field="name" header="Название" editor={textEditor} sortable></Column>
          <Column style={{ width: '15%' }} field="stockStatus" header="Наличие" sortable body={stockStatusTemplate}></Column>
          <Column style={{ width: '15%' }} field="stockQuantity" editor={numberEditor} header="Кол-во в магазине" body={stockQuantityTemplate} sortable></Column>
          <Column style={{ width: '10%' }} field="price" header="Цена" sortable></Column>
          <Column style={{ width: '10%' }} header='Кол-во в CRM' body={retailQuantityTemplate}>
          </Column>
          <Column style={{ width: '10%' }} rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
      </div>
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <DataTable value={tableProducts} editMode='row' onRowToggle={(e: DataTableRowToggleEvent) => setExpandedRows(e.data)}
        expandedRows={expandedRows} rowExpansionTemplate={rowExpansionTemplate}
        filterDisplay="menu" globalFilter={globalFilter} globalFilterFields={['name', 'variations.nodes.name']}
        dataKey="id" header={header} tableStyle={{ minWidth: '60rem' }}>
        <Column expander style={{ width: '3em' }} />
        <Column field="name" header="Название" />
        <Column body={(rowData: productWithVariation) => rowData.variations.nodes.reduce((acc, curr) => acc + (curr.stockQuantity === null ? 0 : curr.stockQuantity), 0)} header="Количество" />
      </DataTable>
    </>
  )
}

