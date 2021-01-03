import React from 'react'
import styled from 'styled-components/macro'
import { Input } from '../styles/userForms'
import { DangerButton } from '../styles/buttons'

export default function Ingredient({
  ingredient,
  handleIngredientChange,
  handleIngredientDelete,
}) {
  function handleChange(changes) {
    handleIngredientChange(ingredient._id, { ...ingredient, ...changes })
  }
  return (
    <>
      <InputSmall
        type='text'
        value={ingredient.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <InputSmall
        type='text'
        value={ingredient.amount}
        onChange={(e) => handleChange({ amount: e.target.value })}
      />
      <DangerButtonSmall
        as='button'
        onClick={() => handleIngredientDelete(ingredient._id)}
      >
        &times;
      </DangerButtonSmall>
    </>
  )
}

const DangerButtonSmall = styled(DangerButton)`
  padding: 0;
  margin: 0;
  margin-top: 0.5rem;
  width: 37px;
  height: 37px;
`
const InputSmall = styled(Input)`
  margin-bottom: 0.5rem;
`
