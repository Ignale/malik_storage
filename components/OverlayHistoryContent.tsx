import { actHistory } from '@/types/authTypes'
import styled from '@emotion/styled'
import React from 'react'
type overlayProps = {
  history: actHistory
}

function OverlayHistoryContent({ history }: overlayProps) {
  return (
    <OverLayWrapper>
      <OverLayHeader>
        <OverLayDate>
          {history.actionDate}
        </OverLayDate>
        <OverLayHeaderText>
          {history.changeMaker.name}
          <small>{history.changeMaker.email}</small>
        </OverLayHeaderText>

      </OverLayHeader>

      <OverLayChange>
        {history.actionArr.map((action) => (<OverLayAction>
          Значение <span>{action.objName === 'stockQuantity' ? 'Количество' : 'Цена'}</span> было изменено с <span>{action.prevValue}</span> на
          <span> {action.newValue}</span>
        </OverLayAction>))}

      </OverLayChange>
    </OverLayWrapper>
  )
}

const OverLayWrapper = styled.div`
  padding: 10px;
  max-width: 300px;
  `
const OverLayHeader = styled.div`
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-weight: 600;
  line-height: 70%;
  text-align: right;
  padding: 5px 0px;
  border-bottom: 1px solid #949494;
  small {
    font-size: 14px;
    font-weight: 400;
    color: #949494
  }
`
const OverLayHeaderText = styled.div`
  display: flex;
  flex-direction: column;
`

const OverLayDate = styled.div`
  font-size: 14px;
  padding-top: 5px;
  color: #949494;
  padding-bottom: 5px;

`
const OverLayChange = styled.div`
padding-top: 10px;
  font-size: 16px;
`
const OverLayAction = styled.div`
  span {
    font-weight: 600;
  };
`


export default OverlayHistoryContent