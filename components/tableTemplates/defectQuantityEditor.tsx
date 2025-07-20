import { DefData } from "@/types/appProps"
import { ColumnEditorOptions } from "primereact/column"
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber"
import { SetStateAction } from "react"


const defectQuantityEditor = (options: ColumnEditorOptions, setDefectTableData: (value: SetStateAction<DefData[] | undefined>) => void) => {
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

export default defectQuantityEditor