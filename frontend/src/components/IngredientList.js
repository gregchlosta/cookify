import React from 'react'
import styled from 'styled-components/macro'
import Ingredient from '../components/Ingredient'
import { Label } from '../styles/userForms'
import { Button } from '../styles/buttons'

export default function IngredientList({
  ingredients,
  handleIngredientChange,
  handleIngredientDelete,
  handleIngredientAdd,
}) {
  return (
    <>
      <Label>Ingredients</Label>

      <IngredientGrid>
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
          />
        ))}
      </IngredientGrid>

      <TextCenterContainer>
        <Button onClick={handleIngredientAdd}>Add Ingredient</Button>
      </TextCenterContainer>
    </>
  )
}

const IngredientGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1.5fr 1fr 37px;
  margin-top: 20px;
`

const TextCenterContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`
