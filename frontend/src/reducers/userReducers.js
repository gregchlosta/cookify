export function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return { loading: true }
    case 'USER_LOGIN_SUCCESS':
      return { loading: false, userAuth: action.payload }
    case 'USER_LOGIN_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_LOGOUT':
      return {}
    default:
      return state
  }
}

export function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return { loading: true }
    case 'USER_REGISTER_SUCCESS':
      return { loading: false }
    case 'USER_REGISTER_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_REGISTER_RESET':
      return {}
    default:
      return state
  }
}

export function userResetPasswordReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_RESET_REQUEST':
      return { loading: true }
    case 'USER_RESET_SUCCESS':
      return { loading: false, success: action.payload }
    case 'USER_RESET_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DELETE_REQUEST':
      return { loading: true }
    case 'USER_DELETE_SUCCESS':
      return { loading: false, success: true }
    case 'USER_DELETE_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export function userDetailsReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_DETAILS_REQUEST':
      return { ...state, loading: true }
    case 'USER_DETAILS_SUCCESS':
      return { loading: false, userInfo: action.payload }
    case 'USER_DETAILS_FAIL':
      return { loading: false, error: action.payload }
    case 'USER_DETAILS_RESET':
      return { user: {} }
    default:
      return state
  }
}

export function userUpdateProfileReducer(state = {}, action) {
  switch (action.type) {
    case 'USER_UPDATE_PROFILE_REQUEST':
      return { loading: true }
    case 'USER_UPDATE_PROFILE_SUCCESS':
      return { loading: false, success: true }
    case 'USER_UPDATE_PROFILE_FAIL':
      return { loading: false, failure: action.payload }
    case 'USER_UPDATE_PROFILE_RESET':
      return {}
    default:
      return state
  }
}
