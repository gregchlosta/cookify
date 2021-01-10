import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userLoginReducer,
  userRegisterReducer,
  userResetPasswordReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  itemCommentCreateReducer,
  itemCreateReducer,
  itemUpdateReducer,
  itemDeleteReducer,
  itemDetailsReducer,
  itemLikeReducer,
  itemsListReducer,
} from './reducers/itemReducers'

// Please add reducers here
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userResetPassword: userResetPasswordReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  itemsList: itemsListReducer,
  itemDetails: itemDetailsReducer,
  itemCreate: itemCreateReducer,
  itemUpdate: itemUpdateReducer,
  itemDelete: itemDeleteReducer,
  itemLike: itemLikeReducer,
  itemCommentCreate: itemCommentCreateReducer,
})

const userAuthFromStorage = localStorage.getItem('userAuth')
  ? JSON.parse(localStorage.getItem('userAuth'))
  : null

const initialState = {
  userLogin: { userAuth: userAuthFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
