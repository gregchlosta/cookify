import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { FaCookieBite, FaHeart, FaUserEdit, FaSignOutAlt } from 'react-icons/fa'

import UserImage from './UserImage'

export default function UserMenu({ userAuth, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleToogle() {
    setIsOpen(!isOpen)
  }

  return (
    <DropDownContainer>
      <DropDownHeader onClick={handleToogle}>
        <UserImage profileImage={userAuth.imageUrl} size='3rem' />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            <ListItem>
              <ItemLink to='/my'>
                <FaCookieBite size='1.4rem' color='gray' />
                <TitleWraper>My Recipes</TitleWraper>
              </ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to='/favorite'>
                <FaHeart size='1.4rem' color='pink' />
                <TitleWraper>Favorite</TitleWraper>
              </ItemLink>
            </ListItem>
            <ListItem>
              <ItemLink to='/profile'>
                <FaUserEdit size='1.4rem' color='gray' />
                <TitleWraper>Edit Profile</TitleWraper>
              </ItemLink>
            </ListItem>
            <ListItem onClick={handleLogout}>
              <FaSignOutAlt size='1.4rem' color='gray' />
              <TitleWraper>Sign Out</TitleWraper>
            </ListItem>
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  )
}

const DropDownContainer = styled('div')`
  display: flex;
  align-items: center;
`

const DropDownHeader = styled('div')`
  margin: 1rem;
`

const DropDownListContainer = styled('div')`
  position: absolute;
  top: 80px;
  right: 30px;

  @media (max-width: 400px) {
    top: 150px;
  }
`

const DropDownList = styled('ul')`
  width: 15rem;
  padding: 1rem;
  background: ${(props) => props.theme.white};
  border: none;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.gray1};
  font-size: 1rem;
  font-weight: 500;
`

const ListItem = styled('li')`
  padding: 1rem;
  border-radius: 10px;
  list-style-type: none;
  display: flex;
  align-items: center;

  &:hover {
    background: ${(props) => props.theme.gray2};
  }
`
const ItemLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.gray1};
  text-decoration: none;
`
const TitleWraper = styled('span')`
  align-self: center;
  margin-left: 0.5rem;
`
