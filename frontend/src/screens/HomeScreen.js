import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listItems } from '../actions/itemActions'
import Header from '../components/Header'
import ItemsGrid from '../components/ItemsGrid'
import SearchBox from '../components/SearchBox'
import CategoryBar from '../components/CategoryBar'
import { ReactComponent as Loader } from '../assets/spiner-color.svg'
import { Message, FullScreenContainer } from '../styles/userForms'

export default function HomeScreen({ location }) {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  const { loading, error, items } = useSelector((state) => state.itemsList)

  useEffect(() => {
    dispatch(listItems(location.pathname, keyword, category))
  }, [dispatch, location, keyword, category])

  return (
    <>
      <Header />
      <FullScreenContainer>
        <SearchBox setKeyword={setKeyword} />
        <CategoryBar category={category} setCategory={setCategory} />
        {error && <Message>${error}</Message>}
        {loading ? <Loader /> : <ItemsGrid items={items} />}
      </FullScreenContainer>
    </>
  )
}
