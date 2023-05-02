import Side from './Side'
import styled from '@emotion/styled';
import { AppProps } from '@/types/appProps';

function Layout({ children }: AppProps) {
  return (
    <Container>
      <Side />
      <Content>
        {children}
      </Content>
    </Container>
  )
}
export default Layout

const Container = styled('div')({
  display: 'flex',
  width: '100%',

})

const Content = styled('div')({
  width: '80vw',
  height: '100vh',
  overflowY: 'scroll',
  paddingRight: '20px',
  paddingLeft: '20px'
})