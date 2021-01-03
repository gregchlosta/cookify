import React from 'react'
import styled from 'styled-components/macro'
import { DangerButton } from '../styles/buttons'

export default function CategoryBar({ category, setCategory }) {
  function handleCategoryChange(newCategory) {
    if (category === newCategory) {
      setCategory('')
    } else {
      setCategory(newCategory)
    }
  }

  return (
    <Container>
      <DangerButton onClick={() => handleCategoryChange('')}>
        Everything!
      </DangerButton>
      <DangerButton onClick={() => handleCategoryChange('breakfast')}>
        Breakfast
      </DangerButton>
      <DangerButton onClick={() => handleCategoryChange('lunch')}>
        Lunch
      </DangerButton>
      <DangerButton onClick={() => handleCategoryChange('dinner')}>
        Dinner
      </DangerButton>
      <DangerButton onClick={() => handleCategoryChange('snacks')}>
        Snacks
      </DangerButton>
      <DangerButton onClick={() => handleCategoryChange('vegetarian')}>
        Vegetarian
      </DangerButton>
      <DangerButton onClick={() => handleCategoryChange('vegan')}>
        Vegan
      </DangerButton>
      <DangerButton onClick={() => handleCategoryChange('sea-food')}>
        Sea Food
      </DangerButton>
      <DangerButton onClick={() => handleCategoryChange('meat')}>
        Meat
      </DangerButton>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`
