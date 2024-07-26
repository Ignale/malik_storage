import { productWithVariation } from '@/types/appProps';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { Nullable } from 'primereact/ts-helpers';
import { Dispatch, RefObject, SetStateAction, SyntheticEvent, useState } from 'react'

type Props = {
  visibleBatchModal: boolean
  setVisibleBatchModal: Dispatch<SetStateAction<boolean>>
  tableProducts: productWithVariation[] | []
  toast: RefObject<Toast>
}

function ChangePricesModal({ setVisibleBatchModal, visibleBatchModal, tableProducts, toast }: Props) {
  const [value, setValue] = useState<Nullable<number | null>>(0)

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/batchChangePrices', {
        method: "POST",
        body: JSON.stringify({
          changePrice: value
        })
      })
      if (!res.ok) {
        throw new Error('somethin went wrong')
      }
      const data = await res.json()
      toast.current!.show({ severity: 'success', summary: 'Успешно', detail: data.message, life: 3000 })
      console.log(data.length)
    } catch (error) {
      console.log(error)

    }
  }
  return (
    <Dialog header='Укажите сумму увeличения цены для всех товаров' style={{ maxWidth: '400px', width: '50vw' }} visible={visibleBatchModal} onHide={() => { if (!visibleBatchModal) return; setVisibleBatchModal(false); }} >
      <form onSubmit={onSubmit}>
        <InputNumber inputId="currency-ru" value={value} onValueChange={(e) => setValue(e.value)} style={{ width: '100%' }} mode="currency" currency="RUB" locale="ru-RU" />
        <div style={{ display: "flex", justifyContent: 'flex-end' }}>
          <Button style={{ marginTop: '20px', marginLeft: 'auto' }} type='submit' label="Отправить" />
        </div>


      </form>
    </Dialog>
  )
}

export default ChangePricesModal