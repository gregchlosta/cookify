import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import formatDistance from 'date-fns/formatDistance'
import { getItemDetails, createItemComment } from '../actions/itemActions'
import { Button } from '../styles/buttons'

export default function Comments({ itemId, comments }) {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const { success } = useSelector((state) => state.itemCommentCreate)

  useEffect(() => {
    if (success) {
      dispatch(getItemDetails(itemId))
    }
  }, [success, dispatch, itemId])

  function handleAddComment() {
    dispatch(createItemComment(itemId, text))
  }

  return (
    <Container>
      <Title>Comments</Title>
      {comments.map((comment) => (
        <div key={comment._id}>
          <CommentHeader>
            <UserName>{comment.userName}</UserName> posted{' '}
            {formatDistance(new Date(comment.createdAt), Date.now(), {
              addSuffix: true,
            })}
          </CommentHeader>
          <Comment>{comment.text}</Comment>
        </div>
      ))}

      <Title>Add a new comment</Title>
      <InputTextArea
        onChange={(event) => setText(event.target.value)}
        value={text}
        rows='3'
        cols='60'
      />
      <BtnContainer>
        <Button onClick={handleAddComment}>Add Comment</Button>
      </BtnContainer>
    </Container>
  )
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
`
export const InputTextArea = styled.textarea`
  background: ${(props) => props.theme.secondaryFaded};
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  padding: 8px 10px;
  outline: none;
  width: 100%;
`

export const BtnContainer = styled.div`
  margin: 1rem 0;
`

export const CommentHeader = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0;
`
export const UserName = styled.span`
  font-weight: 600;
  padding: 0.2rem;
`
export const Comment = styled.p`
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
  line-height: 1.5rem;
  background-color: ${(props) => props.theme.gray2};
  border-radius: 0.5rem;
`
