import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { ReactComponent as Loader } from '../assets/spiner-color.svg'
import { Button } from '../styles/buttons'
import {
  MainContainer,
  LeftContainer,
  RightContainer,
  ContentContainer,
  LogoContainer,
  LogoLink,
  MainText,
  Image,
  Form,
  Heading,
  Input,
  Label,
  Wraper,
  Message,
  StyledLink,
  StyledParagraph,
} from '../styles/userForms'

export default function RegisterScreen({ history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.userRegister)

  const { userAuth } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (userAuth) {
      history.push('/')
    }
  }, [history, userAuth])

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      setMessage(null)
      dispatch(register(name, email, password))
    }
  }

  return (
    <MainContainer>
      <LeftContainer>
        <ContentContainer>
          <LogoContainer>
            <LogoLink to='/'>Cookify</LogoLink>
          </LogoContainer>
          <MainText>Discover the world’s top Recipes & Cooking Chefs.</MainText>
          <Image src='/img/food.jpg' />
        </ContentContainer>
      </LeftContainer>
      <RightContainer>
        <ContentContainer>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Heading>Log in to Cookify</Heading>

              <Label>Username</Label>
              <Input
                white
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Label>Email Address</Label>
              <Input
                white
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Label>Password</Label>
              <Input
                white
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Label>Confirm Password</Label>
              <Input
                white
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <Wraper>
                {error && <Message>{error}</Message>}
                {message && <Message>{message}</Message>}
                <Button>Create Account</Button>
                <StyledParagraph>
                  Already a member? <StyledLink to='/login'>Log in</StyledLink>
                </StyledParagraph>
              </Wraper>
            </Form>
          )}
        </ContentContainer>
      </RightContainer>
    </MainContainer>
  )
}
