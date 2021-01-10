import styled from 'styled-components/macro'

export const Button = styled.button`
  font-weight: 400;
  border: none;
  border-radius: 0.5em;
  font-size: 1rem;
  cursor: pointer;
  text-transform: capitalize;
  background: ${(props) => props.theme.primary};
  padding: 0.6em 1em;
  margin: 0.3rem;
  color: ${(props) => props.theme.white};
  text-align: center;
  text-decoration: none;
  outline: none;

  @media (max-width: 600px) {
    padding: 0.4em 0.7em;
  }

  &:hover,
  &:focus {
    background: ${(props) => props.theme.primaryFaded};
    box-shadow: 0 0 6px 0 ${(props) => props.theme.primary};
  }
`
export const DangerButton = styled(Button)`
  background: ${(props) => props.theme.danger};

  &:hover,
  &:focus {
    background: ${(props) => props.theme.dangerFaded};
    box-shadow: 0 0 6px 0 ${(props) => props.theme.danger};
  }
`

export const WhiteButton = styled(Button)`
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme.gray1};

  &:hover,
  &:focus {
    background: ${(props) => props.theme.white};
    box-shadow: 0 0 6px 0 ${(props) => props.theme.gray3};
    color: ${(props) => props.theme.black};
  }
`
