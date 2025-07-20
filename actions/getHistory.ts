
'use server'
export default async function getHistory({ sku }: { sku: string }) {
  try {
    const response = await fetch(`https://malik-storage-default-rtdb.firebaseio.com/history/${sku}.json`)
    const data = await response.json()
    return data

  } catch (error) {
    console.log(error)
    return { error }
  }

}