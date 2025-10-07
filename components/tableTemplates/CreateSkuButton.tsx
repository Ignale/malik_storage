'use client'
import React, { useState } from "react";
import { Variation } from "@/types/appProps";
import { createSku } from "@/app/actions";
import { Button } from "primereact/button";
import useCache from "@/lib/hooks/useCache";
import { set, update } from "firebase/database";


type Props = {
  productId?: string;
  variations: Variation[];
  toast?: React.RefObject<any>;
}

function CreateSkuButton({ productId, variations, toast }: Props) {

  const [loding, setLoading] = useState(false)

  const { updateSKU } = useCache()

  const variationIdsWithoutSku = variations.filter(v => !v.sku).map(v => v.databaseId);

  const handleCreateSku = async () => {
    if (!productId) return
    setLoading(true)
    if (variationIdsWithoutSku.length === 0) {
      toast?.current?.show({ severity: 'info', summary: 'Информация', detail: 'Все вариации уже имеют SKU', life: 3000 });
      return
    }
    try {

      const createdSkus = await createSku(productId, variationIdsWithoutSku)
      if (createdSkus && Array.isArray(createdSkus)) {

        console.log('createdSkus', createdSkus);
        createdSkus.forEach((v: { id: string, sku: string }) => updateSKU(variations.find(vari => vari.databaseId == v.id)?.id, v.sku))

        toast?.current?.show({ severity: 'success', summary: 'Успех', detail: `SKU созданы для ${createdSkus.length} вариаций`, life: 3000 })

      } else {
        toast?.current?.show({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось создать SKU', life: 3000 })
      }
    } catch (err) {
      console.error('createSku client call failed', err)
      toast?.current?.show({ severity: 'error', summary: 'Ошибка', detail: 'Серверная ошибка при создании SKU', life: 3000 })
    }
    setLoading(false)
  }

  console.log(variationIdsWithoutSku)

  return (
    <div>
      <Button label="Создать SKU" icon={loding ? 'pi pi-spin pi-spinner' : "pi pi-plus"} className="p-button-sm" onClick={handleCreateSku} />
    </div>
  )
}

export default CreateSkuButton