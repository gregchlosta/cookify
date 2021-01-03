import React from 'react'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import Logo from './Logo'
import UserMenu from './UserMenu'

export default function HeaderAlt() {
  const dispatch = useDispatch()

  const { userAuth } = useSelector((state) => state.userLogin)

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Navbar>
      <Logo />
      <Heading>Publish your Recipe</Heading>
      <UserMenu userAuth={userAuth} handleLogout={handleLogout} />
    </Navbar>
  )
}

const Navbar = styled.nav`
  width: 100%;
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.gray1};
`

const Heading = styled.h1`
  @media (max-width: 600px) {
    display: none;
  }
`
