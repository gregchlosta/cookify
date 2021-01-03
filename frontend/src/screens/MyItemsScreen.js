import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listItems } from '../actions/itemActions'
import Header from '../components/Header'
import ItemsList from '../components/ItemsList'
import { ReactComponent as Loader } from '../assets/spiner-color.svg'
import { FullScreenContainer, Heading, Message } from '../styles/userForms'

export default function MyItemsScreen({ location }) {
  const dispatch = useDispatch()

  const { loading, error, items } = useSelector((state) => state.itemsList)
  const { userAuth } = useSelector((state) => state.userLogin)

  useEffect(() => {
    dispatch(listItems(location.pathname))
  }, [dispatch, location])

  return (
    <>
      <Header />
      <FullScreenContainer>
        <Heading>{userAuth.name} / Your Recipes</Heading>
        {error && <Message>${error}</Message>}
        {loading ? <Loader /> : <ItemsList items={items} />}
      </FullScreenContainer>
    </>
  )
}
