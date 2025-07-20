import { DefData, productWithVariation, Variation } from '@/types/appProps';
import { DataTableExpandedRows, DataTableRowToggleEvent } from 'primereact/datatable';
import { Dispatch, SetStateAction } from 'react';

export const getStockSeverity = (rowData: Variation) => {
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

export const expandRowHandler = (e: DataTableRowToggleEvent, setExpandedRows: Dispatch<SetStateAction<any[] | DataTableExpandedRows>>, tableProducts: productWithVariation[]) => {

  console.log('expandRowHandler')

  let currProuduct = tableProducts.find((product) => product.id === Object.keys(e.data)[0])

  const variationIds = currProuduct?.variations.nodes.map(variation => variation.id) || []

  setExpandedRows(e.data)

  console.log(currProuduct)
}

export const getStockQuantitySeverity = (quantity: Variation['stockQuantity']) => {
  if (quantity === null || quantity === 0) return 'danger'
  if (quantity < 4) return 'warning'
  return 'success'
}
