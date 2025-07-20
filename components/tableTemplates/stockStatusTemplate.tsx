import { getStockSeverity } from "@/lib/helpers";
import { Variation } from "@/types/appProps";
import { Tag } from "primereact/tag";


const stockStatusTemplate = (rowData: Variation) => (<Tag value={(rowData.stockQuantity! > 0 && rowData.stockQuantity! <= 3) ? 'Мало' :
  (rowData.stockQuantity! > 3) ? 'В наличии' :
    'Нет в наличии'} severity={getStockSeverity(rowData)} ></Tag>)


export default stockStatusTemplate;