import { AppProps } from '@/types/appProps';
import styled from '@emotion/styled';

type CardProps = {
  column?: boolean,
  children: AppProps['children']
}

function Card({ children, column }: CardProps) {
  return (
    <CardWrapper column={column}>
      {children}
    </CardWrapper>
  )
}


const CardWrapper = styled('div')<CardProps>(
  props => ({
    flexDirection: props?.column ? 'column' : 'row',
  }),
  {
    display: 'flex',
    padding: '15px',
    marginTop: '20px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd9d9',
    boxShadow: '0 0 3px #aaa',
  })

export default Card