import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FaSearch } from 'react-icons/fa'

export default function SearchBox({ setKeyword }) {
  const [inputText, setInputText] = useState('')

  function handleSearch() {
    setKeyword(inputText)
  }

  return (
    <Container>
      <SearchContainer>
        <SearchField
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value)
          }}
          type='text'
          placeholder='Search...'
        />
        <SearchButton onClick={handleSearch}>
          <FaSearch size='1.4rem' />
        </SearchButton>
      </SearchContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
`

const SearchContainer = styled.div`
  width: 60%;
  display: flex;

  @media (max-width: 800px) {
    width: 100%;
  }
`

const SearchField = styled.input`
  width: 100%;
  border: 3px solid ${(props) => props.theme.primary};
  border-right: none;
  padding: 5px 10px;
  height: 50px;
  border-radius: 8px 0 0 8px;
  outline: none;
  color: ${(props) => props.theme.gray1};
  font-size: 1.5rem;
`

const SearchButton = styled.button`
  width: 50px;
  height: 50px;
  padding: 0.1rem;
  border: 1px solid ${(props) => props.theme.primary};
  background: ${(props) => props.theme.primary};
  text-align: center;
  color: ${(props) => props.theme.white};
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  text-decoration: none;
  outline: none;

  &:hover {
    color: ${(props) => props.theme.danger};
  }
`
