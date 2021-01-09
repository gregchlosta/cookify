import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { useDropzone } from 'react-dropzone'
import HeaderAlt from '../components/HeaderAlt'
import CategoryList from '../components/CategoryList'
import IngredientList from '../components/IngredientList'
import FooterAlt from '../components/FooterAlt'
import { Label, Input } from '../styles/userForms'
import { Message } from '../styles/userForms'
import { ReactComponent as Loader } from '../assets/spiner-color.svg'
import { createItem, getItemDetails, updateItem } from '../actions/itemActions'

export default function ItemAddScreen({ history, match }) {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState()
  const [cookTime, setCookTime] = useState(0)
  const [servings, setServings] = useState(1)
  const [category, setCategory] = useState([])
  const [instructions, setInstructions] = useState('')
  const [ingredients, setIngredients] = useState([
    {
      _id: uuidv4(),
      name: '',
      amount: '',
    },
  ])

  const [uploading, setUploading] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      handleUpload(acceptedFiles[0])
    },
  })

  const dispatch = useDispatch()

  const { error: errorCreate, success: successCreate } = useSelector(
    (state) => state.itemCreate
  )
  const { error: errorDetails, item } = useSelector(
    (state) => state.itemDetails
  )
  const { error: errorUpdate, success: successUpdate } = useSelector(
    (state) => state.itemUpdate
  )

  // Fetching item details if item ID present
  useEffect(() => {
    if (match.params.id) {
      dispatch(getItemDetails(match.params.id))
    }
  }, [match, dispatch])

  // Populating the form with item details
  useEffect(() => {
    if (item && match.params.id) {
      setTitle(item.title)
      setImageUrl(item.imageUrl)
      setCookTime(item.cookTime)
      setServings(item.servings)
      setCategory(item.category)
      setInstructions(item.instructions)
      setIngredients(item.ingredients)
    }
  }, [item, match])

  // Redirecting after sucessful item creation
  useEffect(() => {
    if (successCreate) {
      history.push('/')
    }
  }, [successCreate, history])

  // Redirecting after sucessful item update
  useEffect(() => {
    if (successUpdate) {
      history.push('/my')
    }
  }, [successUpdate, history])

  async function handleUpload(file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'z145tixo')

    setUploading(true)

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/upload`,
        formData
      )

      setImageUrl(data.secure_url)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
    setUploading(false)
  }

  function handleCategoryChange(value) {
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value))
    } else {
      setCategory([...category, value])
    }
  }

  function handleIngredientAdd() {
    const newIngredient = {
      _id: uuidv4(),
      name: '',
      amount: '',
    }
    setIngredients([...ingredients, newIngredient])
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...ingredients]
    const index = newIngredients.findIndex((item) => item._id === id)
    newIngredients[index] = ingredient
    setIngredients(newIngredients)
  }

  function handleIngredientDelete(id) {
    setIngredients(ingredients.filter((item) => item._id !== id))
  }

  function handleSubmit() {
    dispatch(
      createItem({
        title,
        imageUrl,
        servings,
        cookTime,
        instructions,
        ingredients,
        category,
      })
    )
  }

  function handleUpdate() {
    dispatch(
      updateItem(match.params.id, {
        title,
        imageUrl,
        servings,
        cookTime,
        instructions,
        ingredients,
        category,
      })
    )
  }

  return (
    <MainContainer>
      <HeaderAlt />
      <GridContainer>
        <SectionContainer>
          <ImageContainer {...getRootProps()}>
            <input {...getInputProps()} />
            {uploading ? (
              <Loader />
            ) : imageUrl ? (
              <Image src={imageUrl} alt='recipe' />
            ) : (
              <Text>
                <p>Please drop photo here,</p>
                <p>or click to choose the file</p>
              </Text>
            )}
          </ImageContainer>
        </SectionContainer>
        <SectionContainer>
          <Label>Title</Label>
          <Input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Label>
            Cook Time <Postfix>(in minutes)</Postfix>
          </Label>
          <Input
            type='number'
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
          <Label>Servings</Label>
          <Input
            type='number'
            value={servings}
            min='1'
            onChange={(e) => setServings(e.target.value)}
            required
          />

          <CategoryList
            category={category}
            handleCategoryChange={handleCategoryChange}
          />
        </SectionContainer>
        <SectionContainer>
          <Label>Instructions</Label>
          <InputTextArea
            rows='15'
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </SectionContainer>
        <SectionContainer>
          <IngredientList
            ingredients={ingredients}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            handleIngredientAdd={handleIngredientAdd}
          />
        </SectionContainer>
      </GridContainer>

      <TextCenterContainer>
        {errorDetails && <Message>{errorDetails.message}</Message>}
        {errorCreate && <Message>{errorCreate.message}</Message>}
        {errorUpdate && <Message>{errorUpdate.message}</Message>}
      </TextCenterContainer>

      <FooterAlt
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        existing={match.params.id}
      />
    </MainContainer>
  )
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme.gray1};
`

const GridContainer = styled.div`
  margin: auto;
  padding: 0 2rem;
  margin-top: 3rem;
  max-width: 1000px;
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

const SectionContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`
const Postfix = styled.span`
  font-size: 0.8rem;
  font-weight: normal;
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100px;
  border: 3px dashed ${(props) => props.theme.gray3};
  border-radius: 1rem;
`

const InputTextArea = styled.textarea`
  background: ${(props) => props.theme.secondaryFaded};
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  padding: 8px 10px;
  outline: none;
  width: 100%;
`

const TextCenterContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`
