import { Variation } from './../../types/appProps';
import { Tag } from 'primereact/tag';
import { getStockQuantitySeverity } from '@/lib/helpers';

const stockQuantityTemplate = (rowData: Variation) => {

  const stockQuantity = rowData.stockQuantity ? rowData.stockQuantity : 0

  return (<Tag value={stockQuantity} severity={getStockQuantitySeverity(rowData.stockQuantity)} ></Tag>)
}

export default stockQuantityTemplate