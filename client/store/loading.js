/**
 * ACTION TYPES
 */
const SET_LOADING_TRUE = 'SET_LOADING_TRUE'

/**
 * ACTION CREATORS
 */
export const setLoadingTrue = () => ({
  type: SET_LOADING_TRUE
})

/**
 * INITIAL STATE
 */
const defaultLoadingState = false

/**
 * REDUCER
 */
export default function(state = defaultLoadingState, action) {
  switch (action.type) {
    case SET_LOADING_TRUE:
      return true
    case 'GOT_CODE':
      return false
    case 'GOT_SERVER_ERROR':
      return false
    default:
      return state
  }
}
