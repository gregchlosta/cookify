import axios from 'axios'
import { logout } from './userActions'

export function listItems(patch, keyword = '', category = '') {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'ITEM_LIST_REQUEST',
      })

      let config = {}

      const {
        userLogin: { userAuth },
      } = getState()

      if (userAuth) {
        config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userAuth.token}`,
          },
        }
      }

      const { data } = await axios.get(
        `/api/items${patch}?keyword=${keyword}&category=${category}`,
        config
      )

      dispatch({
        type: 'ITEM_LIST_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message = error.response.data.message
      dispatch({
        type: 'ITEM_LIST_FAIL',
        payload: message,
      })
    }
  }
}

export function getItemDetails(itemId) {
  return async function (dispatch) {
    try {
      dispatch({
        type: 'ITEM_DETAILS_REQUEST',
      })

      const { data } = await axios.get(`/api/items/${itemId}`)

      dispatch({
        type: 'ITEM_DETAILS_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message = error.response.data.message
      dispatch({
        type: 'ITEM_DETAILS_FAIL',
        payload: message,
      })
    }
  }
}

export function createItem(item) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'ITEM_CREATE_REQUEST',
      })

      const {
        userLogin: { userAuth },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`,
        },
      }

      const { data } = await axios.post(`/api/items`, item, config)

      dispatch({
        type: 'ITEM_CREATE_SUCCESS',
        payload: data,
      })

      dispatch({
        type: 'ITEM_CREATE_RESET',
        payload: data,
      })
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'ITEM_CREATE_FAIL',
        payload: message,
      })
    }
  }
}

export function updateItem(itemId, updatedItem) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'ITEM_UPDATE_REQUEST',
      })

      const {
        userLogin: { userAuth },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/items/${itemId}`,
        updatedItem,
        config
      )

      dispatch({
        type: 'ITEM_UPDATE_SUCCESS',
        payload: data,
      })
      dispatch({
        type: 'ITEM_UPDATE_RESET',
        payload: data,
      })
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'ITEM_UPDATE_FAIL',
        payload: message,
      })
    }
  }
}

export function deleteItem(itemId) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'ITEM_DELETE_REQUEST',
      })

      const {
        userLogin: { userAuth },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`,
        },
      }

      const { data } = await axios.delete(`/api/items/${itemId}`, config)

      dispatch({
        type: 'ITEM_DELETE_SUCCESS',
        payload: data,
      })
      dispatch({
        type: 'ITEM_DELETE_RESET',
        payload: data,
      })
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'ITEM_DELETE_FAIL',
        payload: message,
      })
    }
  }
}

export function likeItem(itemId) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'ITEM_LIKE_REQUEST',
      })

      const {
        userLogin: { userAuth },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`,
        },
      }

      const { data } = await axios.post(`/api/items/like/${itemId}`, {}, config)

      dispatch({
        type: 'ITEM_LIKE_SUCCESS',
        payload: data,
      })
      dispatch({
        type: 'ITEM_LIKE_RESET',
        payload: data,
      })
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'ITEM_LIKE_FAIL',
        payload: message,
      })
    }
  }
}

export function createItemComment(itemId, text) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'ITEM_COMMENT_CREATE_REQUEST',
      })

      const {
        userLogin: { userAuth },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userAuth.token}`,
        },
      }

      const { data } = await axios.post(
        `/api/items/comment/${itemId}`,
        { text },
        config
      )

      dispatch({
        type: 'ITEM_COMMENT_CREATE_SUCCESS',
        payload: data,
      })
      dispatch({
        type: 'ITEM_COMMENT_CREATE_RESET',
        payload: data,
      })
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'ITEM_COMMENT_CREATE_FAIL',
        payload: message,
      })
    }
  }
}
