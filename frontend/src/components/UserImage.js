import React from 'react'
import styled from 'styled-components'

export default function UserImage({ profileImage, size }) {
  return (
    <ProfilePicture size={size}>
      <img src={profileImage} alt='user' />
    </ProfilePicture>
  )
}

const ProfilePicture = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  img {
    width: 100%;
  }
`
