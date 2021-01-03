import React from 'react'
import styled from 'styled-components/macro'
import { Button, WhiteButton } from '../styles/buttons'

export default function FooterAlt({ handleSubmit, handleUpdate, existing }) {
  return (
    <Footer>
      <WhiteButton>Cancel</WhiteButton>

      {existing ? (
        <Button onClick={handleUpdate}>Save Changes</Button>
      ) : (
        <Button onClick={handleSubmit}>Publish to Cookify</Button>
      )}
    </Footer>
  )
}

const Footer = styled.footer`
  width: 100%;
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding: 20px;
  border-top: 1px solid ${(props) => props.theme.gray3};
`
