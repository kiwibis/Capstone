/**
 * INITIAL STATE
 */
const defaultFunctions = []

/**
 * REDUCER
 */
export default function(state = defaultFunctions, action) {
  switch (action.type) {
    case 'GET_USER':
      return action.data || []
    default:
      return state
  }
}
