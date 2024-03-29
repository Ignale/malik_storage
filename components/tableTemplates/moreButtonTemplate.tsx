import { Variation } from "@/types/appProps"
import { actHistory } from "@/types/authTypes"
import { Button } from "primereact/button"
import { OverlayPanel } from "primereact/overlaypanel"
import { SyntheticEvent, useRef, useState } from "react"
import useSWRMutation from "swr/mutation"
import OverlayHistoryContent from "../OverlayHistoryContent"
import styled from "@emotion/styled"


async function getHistory(url: string, { arg }: { arg: { sku: string } }) {
  try {
    const res = await fetch(url, {
      method: "POST",
      body: arg.sku
    })
    if (res.ok) {
      return res.json()
    }
  } catch (error) {
    console.log(error)
    return error
  }

}

const moreButtonTemplate = (rowData: Variation) => {
  const [isFetchinHistory, setIsFetchinHistory] = useState(false)
  const [historyIndex, setHistoryIndex] = useState(0)
  const [history, setHistory] = useState<actHistory[] | []>([])

  const isHistory = history.length >= 1

  const { trigger: fetchHistory } = useSWRMutation('/api/getHistory', getHistory)

  const op = useRef<OverlayPanel>(null)

  const showHistoryHandler = async (e: SyntheticEvent) => {
    setIsFetchinHistory(true)
    fetchHistory({ sku: rowData.sku }).then((data) => {
      let historyArr = []
      for (let key in data) {
        historyArr.push(data[key])
      }
      setIsFetchinHistory(false)
      setHistory(historyArr)
      setHistoryIndex(historyArr.length - 1)
      console.log(data)
      op.current?.toggle(e)
    }).catch((error) => {
      setIsFetchinHistory(false)
      console.log(error)
    })
  }

  const increaseHistoryIndex = () => {
    const maxIndex = history.length - 1
    if (historyIndex < maxIndex) {
      setHistoryIndex(prev => ++prev)
    }
  }
  const decreseHistoryIndex = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => --prev)
    }
  }

  return (<div className="flex justify-content-center">
    <Button icon={`pi ${isFetchinHistory ? 'pi-spin pi-cog' : 'pi-ellipsis-v'} `} onClick={showHistoryHandler} rounded outlined aria-label="Filter" />
    <OverlayPanel showCloseIcon ref={op}>
      {isHistory ? <OverlayHistoryContent history={history[historyIndex]} /> : "Нет истории изменений"}
      {history.length >= 1 &&
        <OverLayNavWrapper>
          <Button icon="pi pi-angle-left" onClick={decreseHistoryIndex} rounded text aria-label="Filter" />
          <Button icon="pi pi-angle-right" onClick={increaseHistoryIndex} rounded text aria-label="Filter" />
        </OverLayNavWrapper>}

    </OverlayPanel>


  </div>

  )
}

const OverLayNavWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export default moreButtonTemplate;