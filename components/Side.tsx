import Link from "next/link";
import styled from '@emotion/styled';
import Image from "next/image";
import logo from '../public/img/logo_black.png'
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useRouter } from "next/router";

type pathProps = {
  path: boolean
}
const Side = () => {
  const { pathname } = useRouter()
  return (
    <SideBar>
      <LogoWrapper>
        <Link href='/'>
          <Logo src={logo} alt="Logo" />
        </Link>
      </LogoWrapper>
      <Menu>
        <MenuItem path={pathname === '/allproducts' ? true : false}>
          <Link href='/allproducts'>
            <StorefrontIcon />
            Все товары
          </Link>
        </MenuItem>
        <MenuItem path={pathname === '/addnew' ? true : false}>
          <Link href='/addnew'>
            <AddBusinessIcon />
            Добавить новый
          </Link>
        </MenuItem>
        <MenuItem path={pathname === '/giftcards' ? true : false}>
          <Link href='/giftcards'>
            <CardGiftcardIcon />
            Подарочные карты
          </Link>
        </MenuItem>
      </Menu>
    </SideBar>
  )
}

export default Side;

const SideBar = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '300px',
  width: '20vw',
  height: '100vh',
  backgroundColor: '#3b3a48',
  alignItems: 'center',
  paddingLeft: '10px',
  paddingRight: '10px'

})

const LogoWrapper = styled.div({
  flexBasis: '10vh',
  display: 'flex',
  alignItems: 'center'
})

const Logo = styled(Image)({
  width: '100%',
  maxWidth: '200px',
  height: 'auto'
})

const Menu = styled.div({
  flexBasis: '60vh',
  width: '100%',
  borderTop: '2px solid #4b4b59',
  borderBottom: '2px solid #4b4b59'
})

const MenuItem = styled('div')<pathProps>(props => ({
  padding: '20px 10px',
  svg: {
    marginRight: '10px'
  },
  a: {
    display: 'flex',
    alignItems: 'center',
    color: props.path ? '#b1b1d3' : '#818199'
  }
}))
