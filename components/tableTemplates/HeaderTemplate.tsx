import React, { ForwardedRef, Ref, SyntheticEvent, forwardRef, useRef } from 'react'
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { TieredMenuPassThroughMethodOptions } from 'primereact/tieredmenu';

type Props = {
  exportCSV: () => void
  createSKUs: () => Promise<void>
  uploadToGoogle: () => Promise<void>
  lookTable: () => Promise<void>
  deleteCustomerDuplicates: () => Promise<void>
  fixExternalId: () => Promise<void>
}


const HeaderTemplate = forwardRef(function HeaderTemplate({ exportCSV, createSKUs, uploadToGoogle, lookTable, deleteCustomerDuplicates, fixExternalId }: Props, ref: any) {

  const ExelTemplate = (data: any) => {
    const menuHandler = (e: SyntheticEvent) => {
      e.preventDefault()
      data.onClick()
    }
    return (
      <a onClick={menuHandler} className='p-menuitem-link' href="">
        <span className={data.icon}></span>
        <span className='p-menuitem-text pl-3'>{data.label}</span>
      </a>
    )
  }
  const items = [
    {
      label: 'Скачать exel',
      onClick: exportCSV,
      icon: 'pi pi-fw pi-file',
      template: ExelTemplate

    },
    {
      label: 'Cоздать SKU',
      icon: 'pi pi-file-edit',
      onClick: createSKUs,
      template: ExelTemplate
    },
    {
      label: 'Выгрузить в таблицу',
      icon: 'pi pi-upload',
      onClick: uploadToGoogle,
      template: ExelTemplate,

    },
    {
      label: 'Синхронизировать с exel',
      icon: 'pi pi-sync',
      onClick: lookTable,
      template: ExelTemplate

    },
    {
      label: 'Удалить дубликаты клиентов',
      icon: 'pi pi-users',
      onClick: deleteCustomerDuplicates,
      template: ExelTemplate
    },
    {
      label: 'Добавить внешние ID',
      icon: 'pi pi-id-card',
      onClick: fixExternalId,
      template: ExelTemplate
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <TieredMenu model={items} popup ref={ref} breakpoint="767px" />
      <Button label="Меню" icon="pi pi-bars" onClick={(e) => ref?.current.toggle(e)} />
    </div>
  )
}
)

export default HeaderTemplate