import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, listItems } from '../actions/itemActions'
import styled from 'styled-components/macro'
import formatDistance from 'date-fns/formatDistance'
import { FaHeart } from 'react-icons/fa'
import { Button, DangerButton } from '../styles/buttons'

export default function RecipeLine({ item }) {
  const dispatch = useDispatch()
  const location = useLocation()

  const { success: successDelete } = useSelector((state) => state.itemDelete)

  // Fething data after sucessful item delete
  useEffect(() => {
    if (successDelete) {
      dispatch(listItems(location.pathname))
    }
  }, [successDelete, location, dispatch])

  function handleDeleteRecipe() {
    dispatch(deleteItem(item._id))
  }

  return (
    <LineContainer>
      <CellContainer>
        <ItemLink to={`/item/${item._id}`}>
          <Image src={item.imageUrl} />
        </ItemLink>
      </CellContainer>
      <CellContainer>
        <ItemLink to={`/item/${item._id}`}>{item.title}</ItemLink>
      </CellContainer>
      <CellContainer>
        {'published '}
        {formatDistance(new window.Date(item.createdAt), window.Date.now(), {
          addSuffix: true,
        })}
      </CellContainer>
      <CellContainer>
        <FaHeart size='1.4rem' color='pink' />
        <LikesWrapper>{item.numLikes}</LikesWrapper>
      </CellContainer>
      <CellContainer>
        <Button as={Link} to={`/edit/${item._id}`}>
          Edit
        </Button>
      </CellContainer>
      <CellContainer>
        <DangerButton onClick={() => handleDeleteRecipe()}>Delete</DangerButton>
      </CellContainer>
    </LineContainer>
  )
}

const LineContainer = styled.div`
  margin: 0.5rem 0;
  display: grid;
  grid-template-columns: 1fr 5fr 3fr 0.5fr 1fr 1fr;
  column-gap: 1rem;
  justify-content: center;
`
const Image = styled.img`
  width: 100%;
  min-width: 70px;
  object-fit: scale-down;
  overflow: hidden;
  border-radius: 0.4rem;
`

const ItemLink = styled(Link)`
  color: ${(props) => props.theme.black};
  text-decoration: none;
`

const CellContainer = styled.div`
  display: flex;
  align-items: center;
`

const LikesWrapper = styled.span`
  margin-left: 0.5rem;
`
