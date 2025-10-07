"use client"

import Link from "next/link";
import styled from '@emotion/styled';
import Image from "next/image";
import logo from '../public/img/logo_black.png'
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { devices } from '../lib/mediaQueries'
import { usePathname } from 'next/navigation'
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { users } from "@/fireBaseConfig";
import { useSession } from "@/session/ClientSession";

type pathProps = {
  path?: boolean
}
const Side = () => {
  const pathname = usePathname()
  const { user } = useSession()
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
        {user && <>
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
        </>}


      </Menu>
      <SubMenu>
        {user && <MenuItem  >
          <Link onClick={(e) => { e.preventDefault(); signOut(users) }} href="#">
            <LogoutIcon />
            Выйти
          </Link>
        </MenuItem>}
        {!user &&
          <MenuItem path={pathname === '/auth' ? true : false}>
            <Link href='/auth'>
              <LoginIcon />
              Войти
            </Link>
          </MenuItem>}
      </SubMenu>
    </SideBar>
  )
}

export default Side;

const SubMenu = styled.div`
  width: '100%',
`

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
   width: 20vw;
   height: 100vh;
   background-color: #3b3a48;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

  ${devices.tablet} {
    position:fixed;
    bottom: 0;  
    padding-bottom: env(safe-are-inset-bottom);
    z-index: 10;
    width: 100vw;
    height: 10vh;
  }
`

const LogoWrapper = styled.div({
  flexBasis: '10vh',
  display: 'flex',
  alignItems: 'center',
  [devices.tablet]: {
    display: 'none'
  }
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
  borderBottom: '2px solid #4b4b59',
  [devices.tablet]: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: 'none',
  }
})

const MenuItem = styled('div')<pathProps>(props => ({
  padding: '20px 10px',
  svg: {
    marginRight: '10px'
  },
  a: {
    display: 'flex',
    alignItems: 'center',
    color: props.path ? '#b1b1d3' : '#818199',
    [devices.tablet]: {
      fontSize: 0
    }
  }
}))
