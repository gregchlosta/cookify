import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export default function Logo() {
  return (
    <LogoLink to='/'>
      <LogoText>Cookify</LogoText>
    </LogoLink>
  )
}

const LogoLink = styled(Link)`
  text-decoration: none;
`

const LogoText = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 1.7rem;
  font-weight: 500;
  color: black;
`
