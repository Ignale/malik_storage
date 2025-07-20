import { DefData, Variation } from "@/types/appProps"

const defectTemplate = (rowData: Variation, defectTableData: DefData[] | undefined,) => {

  console.log(rowData)
  const quantity = defectTableData && defectTableData[defectTableData.findIndex(data => data.databaseId === rowData.databaseId)]?.defectQuantity
  return (quantity ?? 0)
}

export default defectTemplate