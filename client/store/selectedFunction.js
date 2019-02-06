/**
 * ACTION TYPES
 */
const SET_SELECTED_FUNCTION = 'SET_SELECTED_FUNCTION'

/**
 * ACTION CREATORS
 */
export const setSelectedFunction = index => ({
  type: SET_SELECTED_FUNCTION,
  payload: index
})

/**
 * INITIAL STATE
 */
const defaultFunction = null

/**
 * REDUCER
 */
export default function(state = defaultFunction, action) {
  switch (action.type) {
    case SET_SELECTED_FUNCTION:
      return action.payload
    default:
      return state
  }
}
