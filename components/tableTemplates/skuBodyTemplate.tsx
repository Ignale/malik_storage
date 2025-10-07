import React from 'react'
import { Variation } from './../../types/appProps';

import { Button } from 'primereact/button';



type Props = {}

function skuBodyTemplate(rowData: Variation) {
  const sku = rowData.sku;

  const createSkuHandler = () => {
    // Logic to create SKU
    console.log('Create SKU clicked');
  }
  return (
    <div>{sku ?? <Button onClick={createSkuHandler}>Create SKU</Button>}</div>
  )
}

export default skuBodyTemplate