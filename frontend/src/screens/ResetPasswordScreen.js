import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../actions/userActions'
import { ReactComponent as Loader } from '../assets/spiner-white.svg'
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

export default function LoginScreen({ history }) {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const { userAuth } = useSelector((state) => state.userLogin)
  const { loading, error, success } = useSelector(
    (state) => state.userResetPassword
  )

  useEffect(() => {
    if (userAuth) {
      history.push('/')
    }
  }, [history, userAuth])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(resetPassword(email))
  }

  return (
    <MainContainer>
      <LeftContainer>
        <ContentContainer>
          <LogoContainer>
            <LogoLink to='/'>Cookify</LogoLink>
          </LogoContainer>
          <MainText>Discover the world’s top Recipes & Cooking Chefs.</MainText>
          <Image src='/img/hart2.jpg' />
        </ContentContainer>
      </LeftContainer>
      <RightContainer>
        <ContentContainer>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={handleSubmit}>
              <Heading>Reset your password</Heading>
              <Label>Email Address</Label>
              <Input
                white
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Wraper>
                {error && <Message>{error}</Message>}
                {success && <Message success>{success.message}</Message>}
                <Button>Reset Password</Button>
                <StyledParagraph>
                  Click <StyledLink to='/login'>here</StyledLink> to login!
                </StyledParagraph>
              </Wraper>
            </Form>
          )}
        </ContentContainer>
      </RightContainer>
    </MainContainer>
  )
}
