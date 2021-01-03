import React from 'react'
import styled from 'styled-components/macro'
import ItemLine from './ItemLine'

export default function ItemsList({ items }) {
  return (
    <ListContainer>
      {items.map((item) => {
        return <ItemLine key={item._id} item={item} />
      })}
    </ListContainer>
  )
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`
