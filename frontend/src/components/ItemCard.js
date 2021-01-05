import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import formatDistance from 'date-fns/formatDistance'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listItems, likeItem } from '../actions/itemActions'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import UserImage from './UserImage'

export default function ItemCard({ item }) {
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false)

  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { userAuth } = useSelector((state) => state.userLogin)
  const { success: successLike } = useSelector((state) => state.itemLike)

  useEffect(() => {
    if (userAuth) {
      setLikedByCurrentUser(item.likes.includes(userAuth._id))
    }
  }, [userAuth, item])

  // Fething data after sucessful item like
  useEffect(() => {
    if (successLike) {
      dispatch(listItems(location.pathname))
    }
  }, [successLike, location, dispatch])

  function handleLike() {
    if (userAuth) {
      dispatch(likeItem(item._id))
    } else {
      history.push('/login')
    }
  }

  return (
    <CardContainer>
      <Link to={`/item/${item._id}`}>
        <Image src={item.imageUrl} />
      </Link>
      <DetailContainer>
        <UserContainer>
          <UserImage profileImage={item.userImageUrl} size='3rem' />
          <TitleDateContainer>
            <UserTitle>{item.title}</UserTitle>
            <Date>
              {`posted by ${item.userName} `}
              {formatDistance(
                new window.Date(item.createdAt),
                window.Date.now(),
                {
                  addSuffix: true,
                }
              )}
            </Date>
          </TitleDateContainer>
        </UserContainer>
        <IconsContainer onClick={handleLike}>
          <LikeCounter>{item.numLikes}</LikeCounter>
          <FaHeart
            size='1.7rem'
            color={likedByCurrentUser ? 'pink' : '#dbdbde'}
          />
        </IconsContainer>
      </DetailContainer>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  max-width: 400px;
  max-height: 400px;
`
const Image = styled.img`
  width: 100%;
  height: 290px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 10px;
`
const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const UserContainer = styled.div`
  display: flex;
  align-items: center;
`

const TitleDateContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
`

const UserTitle = styled.p`
  font-weight: 600;
  margin: 0.2rem 0;
`

const Date = styled.p`
  font-size: 0.8rem;
  margin: 0.3rem 0;
`

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`
const LikeCounter = styled.p`
  margin-right: 0.3rem;
  font-size: 1.2rem;
`
