import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserDetails,
  deleteUser,
  updateUserProfile,
} from '../actions/userActions'
import Header from '../components/Header'
import UserImage from '../components/UserImage'
import { ReactComponent as Loader } from '../assets/spiner-color.svg'
import { Button, DangerButton, WhiteButton } from '../styles/buttons'
import {
  FullScreenContainer,
  Heading,
  Form,
  Input,
  Label,
  Message,
  Wraper,
  WideWraper,
} from '../styles/userForms'

export default function ProfileScreen({ history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, userInfo } = useSelector((state) => state.userDetails)

  const { userAuth } = useSelector((state) => state.userLogin)

  const { success, failure } = useSelector((state) => state.userUpdateProfile)

  // Fetching user details
  useEffect(() => {
    if (!userAuth) {
      history.push('/login')
    } else {
      setMessage('')
      dispatch(getUserDetails(userAuth))
    }
  }, [dispatch, history, userAuth])

  // Populating the form with user details
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name)
      setEmail(userInfo.email)
      setImageUrl(userInfo.imageUrl)
    }
  }, [userInfo])

  async function handleUpload(e) {
    e.preventDefault()
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImageUrl(data)

      dispatch(
        updateUserProfile(userAuth, {
          id: userInfo._id,
          imageUrl: data,
        })
      )

      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile(userAuth, {
          id: userInfo._id,
          name,
          email,
          password,
          imageUrl,
        })
      )
    }
  }

  function handleDelete(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(deleteUser(userAuth))
    }
  }

  return (
    <>
      <Header />
      <FullScreenContainer>
        <Heading>{userAuth.name} / Profile</Heading>
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={handleSubmit}>
            {uploading ? (
              <Loader />
            ) : (
              <WideWraper>
                <UserImage profileImage={imageUrl} size='6rem' />
                <input name='image' type='file' onChange={handleUpload} />
              </WideWraper>
            )}

            <Label>Username</Label>
            <Input
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Label>Email</Label>
            <Input
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label>Password</Label>
            <Input
              type='password'
              placeholder='Leave blank to keep the same'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Label>Confirme Password</Label>
            <Input
              type='password'
              placeholder='Leave blank to keep the same'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Wraper>
              {error && <Message>{error}</Message>}
              {message && <Message>{message}</Message>}
              {failure && <Message>Profile Update Failed</Message>}
              {success && <Message success>Profile Updated</Message>}
            </Wraper>

            <WideWraper>
              <Label>Delete your account and account data</Label>
              <DangerButton onClick={handleDelete}>Close Account</DangerButton>
            </WideWraper>

            <WideWraper>
              <Button type='submit' disabled={loading}>
                Update Profile
              </Button>
              <WhiteButton as={Link} to='/'>
                Cancel
              </WhiteButton>
            </WideWraper>
          </Form>
        )}
      </FullScreenContainer>
    </>
  )
}
