import axios from 'axios'

export function login(email, password) {
  return async function (dispatch) {
    try {
      dispatch({
        type: 'USER_LOGIN_REQUEST',
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })

      localStorage.setItem('userAuth', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload: error.response.data.message,
      })
    }
  }
}

export function logout() {
  return function (dispatch) {
    localStorage.removeItem('userAuth')
    dispatch({ type: 'USER_LOGOUT' })
  }
}

export function register(name, email, password) {
  return async function (dispatch) {
    try {
      dispatch({
        type: 'USER_REGISTER_REQUEST',
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      )

      dispatch({
        type: 'USER_REGISTER_SUCCESS',
      })

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })

      dispatch({
        type: 'USER_REGISTER_RESET',
      })

      localStorage.setItem('userAuth', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload: error.response.data.message,
      })
    }
  }
}

export function resetPassword(email) {
  return async function (dispatch) {
    try {
      dispatch({
        type: 'USER_RESET_REQUEST',
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post('/api/users/reset', { email }, config)

      dispatch({
        type: 'USER_RESET_SUCCESS',
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: 'USER_RESET_FAIL',
        payload: error.response.data.message,
      })
    }
  }
}

export function deleteUser() {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'USER_DELETE_REQUEST',
      })

      const {
        userLogin: { userAuth },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.token}`,
        },
      }

      await axios.delete('/api/users/delete', config)

      dispatch({
        type: 'USER_LOGOUT',
      })

      dispatch({
        type: 'USER_DETAILS_RESET',
      })

      localStorage.removeItem('userAuth')

      dispatch({
        type: 'USER_DELETE_SUCCESS',
      })
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'USER_DELETE_FAIL',
        payload: message,
      })
    }
  }
}

export function getUserDetails() {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'USER_DETAILS_REQUEST',
      })

      const {
        userLogin: { userAuth },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userAuth.token}`,
        },
      }

      const { data } = await axios.get('/api/users/profile', config)

      dispatch({
        type: 'USER_DETAILS_SUCCESS',
        payload: data,
      })
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'USER_DETAILS_FAIL',
        payload: message,
      })
    }
  }
}

export function updateUserProfile(updatedUser) {
  return async function (dispatch, getState) {
    try {
      dispatch({
        type: 'USER_UPDATE_PROFILE_REQUEST',
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
        `/api/users/profile`,
        updatedUser,
        config
      )

      dispatch({
        type: 'USER_UPDATE_PROFILE_SUCCESS',
      })

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })

      dispatch({
        type: 'USER_DETAILS_SUCCESS',
        payload: data,
      })
      localStorage.setItem('userAuth', JSON.stringify(data))
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: 'USER_UPDATE_PROFILE_FAIL',
        payload: message,
      })
    }
  }
}
