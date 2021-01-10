import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`
export const FullScreenContainer = styled.div`
  margin: auto;
  padding: 0 2rem;
  margin-top: 3rem;
  max-width: 1000px;
  display: flex;
  flex-direction: column;

  @media (max-width: 400px) {
    margin-top: 0.5rem;
  }
`

export const LeftContainer = styled.div`
  width: 50%;
  height: 100vh;
  background-color: ${(props) => props.theme.white};
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }
`
export const RightContainer = styled.div`
  width: 50%;
  height: 100vh;
  background-color: ${(props) => props.theme.secondary};
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`
export const ContentContainer = styled.div`
  margin: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
`

export const LogoContainer = styled.div`
  width: 100%;
`
export const LogoLink = styled(Link)`
  font-family: 'Pacifico', cursive;
  font-size: 1.7rem;
  color: black;
  text-decoration: none;
`
export const MainText = styled.h1`
  margin: 4rem 0;
  line-height: 2.5rem;
`
export const Image = styled.img`
  width: 100%;
`

export const Form = styled.form``

export const Heading = styled.h1`
  margin: 0;
  margin-bottom: 2rem;

  @media (max-width: 900px) {
    font-size: 1.5rem;
    text-align: center;
  }
`
export const Input = styled.input`
  background: ${(props) =>
    props.white ? 'white' : props.theme.secondaryFaded};
  border: none;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.4em 0.6em;
  outline: none;
  width: 100%;

  :focus {
    box-shadow: 0 0 6px 0 #f6b179;
  }
`

export const Label = styled.label`
  font-weight: 700;
`

export const Wraper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WideWraper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`

export const LabelWraper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Message = styled.p`
  color: ${(props) =>
    props.success ? props.theme.success : props.theme.warning};
  margin-top: 0;
  font-weight: bold;
`
export const StyledLink = styled(Link)`
  color: #4f3cc9;
  text-decoration: none;
`
export const StyledParagraph = styled.p`
  padding: 0.5rem;
`
