'use server'

import { limit } from "firebase/firestore/lite"

export default async function checkRetailQuantity({ variationIds }: { variationIds: number[] }) {
  const filter = JSON.stringify({
    limit: 250,
    page: 1,
    offerExternalId: variationIds,
  })
  const urlencodedPrice = new URLSearchParams();

  urlencodedPrice.append("prices", filter);



}