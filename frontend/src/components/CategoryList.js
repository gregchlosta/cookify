import React from 'react'
import styled from 'styled-components/macro'

export default function CategoryList({ category, handleCategoryChange }) {
  return (
    <>
      <CategoryContainer>
        <CategoryLabel>
          <input
            type='checkbox'
            checked={category.includes('breakfast')}
            onChange={() => handleCategoryChange('breakfast')}
          />
          <LabelTitle>Breakfast</LabelTitle>
        </CategoryLabel>

        <CategoryLabel>
          <input
            type='checkbox'
            checked={category.includes('lunch')}
            onChange={() => handleCategoryChange('lunch')}
          />
          <LabelTitle>Lunch</LabelTitle>
        </CategoryLabel>

        <CategoryLabel>
          <input
            type='checkbox'
            checked={category.includes('dinner')}
            onChange={() => handleCategoryChange('dinner')}
          />
          <LabelTitle>Dinner</LabelTitle>
        </CategoryLabel>

        <CategoryLabel>
          <input
            type='checkbox'
            checked={category.includes('snacks')}
            onChange={() => handleCategoryChange('snacks')}
          />
          <LabelTitle>Snacks</LabelTitle>
        </CategoryLabel>
      </CategoryContainer>

      <CategoryContainer>
        <CategoryLabel>
          <input
            type='checkbox'
            checked={category.includes('vegetarian')}
            onChange={() => handleCategoryChange('vegetarian')}
          />
          <LabelTitle>Vegetarian</LabelTitle>
        </CategoryLabel>

        <CategoryLabel>
          <input
            type='checkbox'
            checked={category.includes('vegan')}
            onChange={() => handleCategoryChange('vegan')}
          />
          <LabelTitle>Vegan</LabelTitle>
        </CategoryLabel>

        <CategoryLabel>
          <input
            type='checkbox'
            checked={category.includes('sea-food')}
            onChange={() => handleCategoryChange('sea-food')}
          />
          <LabelTitle>Sea Food</LabelTitle>
        </CategoryLabel>

        <CategoryLabel>
          <input
            type='checkbox'
            checked={category.includes('meat')}
            onChange={() => handleCategoryChange('meat')}
          />
          <LabelTitle>Meat</LabelTitle>
        </CategoryLabel>
      </CategoryContainer>
    </>
  )
}

const CategoryContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`

const CategoryLabel = styled.label`
  margin: 0.5rem;
`

const LabelTitle = styled.span`
  padding: 0.4rem;
  font-size: 0.9rem;
`
