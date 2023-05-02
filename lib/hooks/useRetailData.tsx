import useSWR from "swr";


export default function useReatailData(url: string) {

  const fetcher = async () => {
    const res = await fetch(url, {
      mode: 'no-cors'
    })
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Добавление дополнительной информации в объект ошибки.
      error.message = await res.json()
      error.cause = res.status
      throw error
    }

    return res.json()
  }
  const { ...args } = useSWR('/api/user', fetcher)

  return { ...args }
}