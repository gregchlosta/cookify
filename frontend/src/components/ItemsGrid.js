import React from 'react'
import styled from 'styled-components/macro'
import ItemCard from './ItemCard'

export default function ItemsGrid({ items }) {
  return (
    <GridContainer>
      {items.map((item) => {
        return <ItemCard key={item._id} item={item} />
      })}
    </GridContainer>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 475px));
  column-gap: 2rem;
  row-gap: 2rem;
  justify-items: center;
  align-items: center;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`
