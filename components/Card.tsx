import { AppProps } from '@/types/appProps';
import styled from '@emotion/styled';

type CardProps = {
  column?: boolean,
  children: AppProps['children']
  minWidth?: string
  padding?: string
}

function Card({ children, column, minWidth, padding }: CardProps) {
  return (
    <CardWrapper minWidth={minWidth} column={column} padding={padding}>
      {children}
    </CardWrapper>
  )
}


const CardWrapper = styled.div<CardProps>`
  display: flex;
  padding: ${props => props.padding ?? '15px'};
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: 1px solid #ddd9d9;
  box-shadow: 0 0 3px #aaa;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  min-width: ${props => props.minWidth ?? 'none'};
`
export default Card