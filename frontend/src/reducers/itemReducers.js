export function itemsListReducer(state = { items: [] }, action) {
  switch (action.type) {
    case 'ITEM_LIST_REQUEST':
      return { loading: true }
    case 'ITEM_LIST_SUCCESS':
      return { loading: false, items: action.payload }
    case 'ITEM_LIST_FAIL':
      return { loading: false, error: action.payload }
    case 'ITEM_LIST_RESET':
      return {}
    default:
      return state
  }
}

export function itemDetailsReducer(state = { loading: true }, action) {
  switch (action.type) {
    case 'ITEM_DETAILS_REQUEST':
      return { loading: true }
    case 'ITEM_DETAILS_SUCCESS':
      return { loading: false, item: action.payload }
    case 'ITEM_DETAILS_FAIL':
      return { loading: false, error: action.payload }
    case 'ITEM_DETAILS_RESET':
      return {}
    default:
      return state
  }
}

export function itemCreateReducer(state = {}, action) {
  switch (action.type) {
    case 'ITEM_CREATE_REQUEST':
      return { loading: true }
    case 'ITEM_CREATE_SUCCESS':
      return { loading: false, success: action.payload }
    case 'ITEM_CREATE_FAIL':
      return { loading: false, error: action.payload }
    case 'ITEM_CREATE_RESET':
      return {}
    default:
      return state
  }
}

export function itemUpdateReducer(state = {}, action) {
  switch (action.type) {
    case 'ITEM_UPDATE_REQUEST':
      return { loading: true }
    case 'ITEM_UPDATE_SUCCESS':
      return { loading: false, success: action.payload }
    case 'ITEM_UPDATE_FAIL':
      return { loading: false, error: action.payload }
    case 'ITEM_UPDATE_RESET':
      return {}
    default:
      return state
  }
}

export function itemDeleteReducer(state = {}, action) {
  switch (action.type) {
    case 'ITEM_DELETE_REQUEST':
      return { loading: true }
    case 'ITEM_DELETE_SUCCESS':
      return { loading: false, success: action.payload }
    case 'ITEM_DELETE_FAIL':
      return { loading: false, error: action.payload }
    case 'ITEM_DELETE_RESET':
      return {}
    default:
      return state
  }
}

export function itemLikeReducer(state = {}, action) {
  switch (action.type) {
    case 'ITEM_LIKE_REQUEST':
      return { loading: true }
    case 'ITEM_LIKE_SUCCESS':
      return { loading: false, success: action.payload }
    case 'ITEM_LIKE_FAIL':
      return { loading: false, error: action.payload }
    case 'ITEM_LIKE_RESET':
      return {}
    default:
      return state
  }
}

export function itemCommentCreateReducer(state = {}, action) {
  switch (action.type) {
    case 'ITEM_COMMENT_CREATE_REQUEST':
      return { loading: true }
    case 'ITEM_COMMENT_CREATE_SUCCESS':
      return { loading: false, success: action.payload }
    case 'ITEM_COMMENT_CREATE_FAIL':
      return { loading: false, error: action.payload }
    case 'ITEM_COMMENT_CREATE_RESET':
      return {}
    default:
      return state
  }
}
