import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import Logo from '../components/Logo'
import UserMenu from '../components/UserMenu'
import { Button, WhiteButton } from '../styles/buttons'

export default function Header() {
  const dispatch = useDispatch()

  const { userAuth } = useSelector((state) => state.userLogin)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <HeaderContainer>
      <Navbar>
        <Logo />
        {userAuth ? (
          <ActionsContainer>
            <UserMenu userAuth={userAuth} handleLogout={handleLogout} />
            <Button as={Link} to='/add'>
              Upload Recipe!
            </Button>
          </ActionsContainer>
        ) : (
          <ActionsContainer>
            <WhiteButton as={Link} to='/login'>
              Log In
            </WhiteButton>
            <Button as={Link} to='/register'>
              Sign Up
            </Button>
          </ActionsContainer>
        )}
      </Navbar>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  background: ${(props) => props.theme.white};
  height: 80px;

  @media (max-width: 400px) {
    height: 150px;
  }
`

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
