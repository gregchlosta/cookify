import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getItemDetails, likeItem } from '../actions/itemActions'
import styled from 'styled-components/macro'
import formatDistance from 'date-fns/formatDistance'
import { ReactComponent as Loader } from '../assets/spiner-color.svg'
import Header from '../components/Header'
import UserImage from '../components/UserImage'
import { FaHeart } from 'react-icons/fa'
import { DangerButton } from '../styles/buttons'
import Comments from '../components/Comments'

export default function ItemDetailsScreen({ match, history }) {
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(false)

  const dispatch = useDispatch()
  const { userAuth } = useSelector((state) => state.userLogin)
  const { loading, error, item } = useSelector((state) => state.itemDetails)
  const { success: successLike } = useSelector((state) => state.itemLike)

  useEffect(() => {
    dispatch(getItemDetails(match.params.id))
  }, [dispatch, match])

  useEffect(() => {
    if (userAuth && item) {
      setLikedByCurrentUser(item.likes.includes(userAuth._id))
    }
  }, [userAuth, item])

  // Fething data after sucessful item like
  useEffect(() => {
    if (successLike) {
      dispatch(getItemDetails(match.params.id))
    }
  }, [successLike, history, match, dispatch])

  function handleLike() {
    if (userAuth) {
      dispatch(likeItem(item._id))
    } else {
      history.push('/login')
    }
  }

  return (
    <>
      <Header />
      {loading || error ? (
        <Loader />
      ) : (
        <MainContainer>
          <HeaderContainer>
            <UserImage profileImage={item.userImageUrl} size='4rem' />
            <TitleAuthorContainer>
              <TitleContainer>
                <ItemTitle>{item.title}</ItemTitle>
                <FaHeart
                  onClick={handleLike}
                  size='1.6rem'
                  color={likedByCurrentUser ? 'pink' : '#dbdbde'}
                />
              </TitleContainer>

              <UserTitle>
                Posted by {item.userName}{' '}
                {formatDistance(new Date(item.createdAt), Date.now(), {
                  addSuffix: true,
                })}
              </UserTitle>
            </TitleAuthorContainer>
          </HeaderContainer>

          <ImageContainer>
            <Image src={item.imageUrl} alt='recipe' />
          </ImageContainer>

          <BadgesContainer>
            {item.category.map((badge, index) => (
              <DangerButton key={index}>{badge}</DangerButton>
            ))}
          </BadgesContainer>

          <DetailsGrid>
            <DetailsLeft>
              <CookTimeAndServingsWraper>
                <LineWraper>
                  <TitleWraper>Cook Time:</TitleWraper>
                  <ContentWraper>{item.cookTime} min</ContentWraper>
                </LineWraper>

                <LineWraper>
                  <TitleWraper>Servings:</TitleWraper>
                  <ContentWraper>{item.servings} portions</ContentWraper>
                </LineWraper>
              </CookTimeAndServingsWraper>

              <InstructionsWraper>
                <TitleWraper>Instructions:</TitleWraper>
                <ContentWraper>{item.instructions}</ContentWraper>
              </InstructionsWraper>
            </DetailsLeft>

            <Ingredients>
              <TitleWraper>Ingredients:</TitleWraper>
              <IngredientsContainer>
                {item.ingredients.map((ing) => (
                  <Ingredient key={ing._id}>
                    <IngredientName>{ing.name}</IngredientName>
                    <IngredientAmount>{ing.amount}</IngredientAmount>
                  </Ingredient>
                ))}
              </IngredientsContainer>
            </Ingredients>
          </DetailsGrid>
          <Comments itemId={item._id} comments={item.comments} />
        </MainContainer>
      )}
    </>
  )
}

const MainContainer = styled.div`
  margin: auto;
  margin-top: 3rem;
  padding: 0 2rem;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`
const HeaderContainer = styled.div`
  display: flex;
`

const TitleAuthorContainer = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const ItemTitle = styled.h1`
  font-weight: 500;
  margin: 0;
  padding-right: 0.5rem;
`
const UserTitle = styled.p`
  margin: 0;
  margin-top: 0.25rem;
`

const ImageContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
`
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  max-height: 500px;

  border-radius: 0.5rem;
`
const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 575px) minmax(auto, 375px);
  column-gap: 2rem;
  row-gap: 2rem;
  justify-items: center;
  align-items: center;
  padding-bottom: 2rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;

    row-gap: 0.5rem;
  }
`
const DetailsLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CookTimeAndServingsWraper = styled.div`
  display: flex;
`
const LineWraper = styled.div`
  display: flex;
  padding: 0.5rem 0;
  padding-right: 1rem;
  font-size: 1.2rem;
`

const TitleWraper = styled.p`
  font-weight: 700;
  padding-right: 0.5rem;
  font-size: 1.2rem;
`

const ContentWraper = styled.p`
  font-size: 1.2rem;
`

const InstructionsWraper = styled.div``

const Ingredients = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;

  @media (max-width: 800px) {
    padding-top: 0;
  }
`
const IngredientsContainer = styled.div``

const Ingredient = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 275px));
  column-gap: 2rem;
  justify-items: start;
`

const IngredientName = styled.span``

const IngredientAmount = styled.span`
  justify-self: end;
`
