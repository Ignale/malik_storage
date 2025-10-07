'use client'
import { Sertificate } from '@/types/appProps'
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import useSWRMutation from 'swr/mutation'
import { Calendar } from 'primereact/calendar';

import { Dropdown } from 'primereact/dropdown';

import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

type SertificatesProps = {
  sertificates: Sertificate[]

}
const statusOptions = [
  { name: 'Использован', label: 'used' },
  { name: 'Активен', label: 'active' },
]
const columns = [
  { field: 'code', header: 'Код карты' },
  { field: 'giver', header: 'ФИО дарителя, тел' },
  { field: 'reciever', header: 'ФИО получателя, тел' },
  { field: 'amount', header: 'Сумма сертификата' },
  { field: 'date', header: 'Дата' },
  { field: 'manager', header: 'Менеджер ' },
  { field: 'status', header: 'Статус' },
];

async function mutateSert(url: string, { arg }: { arg: Sertificate[] }) {
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

function Sertificates({ sertificates }: SertificatesProps) {

  const [sert, setSert] = useState(() => sertificates)

  let toast = useRef<Toast>(null)

  const { trigger } = useSWRMutation(`/api/mutateSert`, mutateSert, {
    onError: (err) => {
      console.log(err)
      toast.current!.show({ severity: 'error', summary: 'Ошибка', detail: err.message, life: 3000 })
    },
    onSuccess: (data) => {
      const resp = data
      toast.current!.show({ severity: 'success', summary: 'Успешно', detail: 'Карта добавлена', life: 3000 })
    },
    revalidate: true
  })

  const amountEditor = (options: ColumnEditorOptions) => {
    return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback?.(e.value)} mode="currency" currency="RUB" />;
  };

  const textEditor = (options: ColumnEditorOptions) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback?.(e.target.value)} />;
  };

  const dataEditor = (options: ColumnEditorOptions) => {
    return <Calendar dateFormat="dd.mm.yyyy" value={options.value} onChange={(e) => {
      const date = new Date(e.target.value as Date)
      const year = date.toLocaleString('default', { year: 'numeric' });
      const month = date.toLocaleString('default', { month: '2-digit' });
      const day = date.toLocaleString('default', { day: '2-digit' });
      let formatedDate = [day, month, year].join('.')

      return (options.editorCallback?.(formatedDate))
    }} />
  }

  const statusEditor = (options: ColumnEditorOptions) => {
    console.log(options)
    return (<Dropdown value={statusOptions.find((opt) => opt.label === options.value)} onChange={(e) =>
      options.editorCallback?.(e.target.value.label)

    } options={statusOptions} optionLabel="name" />)
  }

  const cellEditor = (options: ColumnEditorOptions) => {
    if (options.field === 'amount') return amountEditor(options);
    if (options.field === 'date') return dataEditor(options)
    if (options.field === 'status') return statusEditor(options)
    return textEditor(options);
  };

  const statusBody = (rowData: Sertificate) => {
    console.log(rowData)
    return statusOptions.find(opt => opt.label === rowData.status)?.name
  }

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {

    let sertificates = [...sert]

    let { newData, index } = e

    console.log(e)

    sertificates[index] = newData
    sertificates[index].status = newData.status
    trigger(sertificates)
    setSert(sertificates)

  }

  const addRow = () => {
    setSert((prev) => [...prev, {
      amount: 0,
      code: "",
      date: "",
      giver: '',
      reciever: '',
      manager: '',
      status: '',
    }])
  }


  return (

    <div className="card p-fluid">
      <Toast ref={toast} />
      <DataTable value={sert} editMode="row" tableStyle={{ minWidth: '50rem' }} onRowEditComplete={onRowEditComplete}>
        {columns.map(({ field, header }) => {
          return <Column key={field} field={field} header={header} style={{ width: '25%' }} body={field === 'status' && statusBody} editor={(options) => cellEditor(options)}
          />;
        })}
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
      <Button onClick={addRow} className='mt-5' icon="pi pi-plus" rounded aria-label="Filter" />
    </div>
  )
}

export default Sertificates
