import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_FUNCTIONS = 'GOT_FUNCTIONS'
const UPDATE_FUNCTION = 'UPDATE_FUNCTION'

/**
 * ACTION CREATORS
 */
const gotFunctions = functions => ({type: GOT_FUNCTIONS, payload: functions})
export const updateFunction = ({algoResultText, userEditedText}) => ({
  type: UPDATE_FUNCTION,
  algoResultText,
  userEditedText
})
/**
 * THUNK CREATORS
 */
export const fetchFunctions = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/trainingData')
    dispatch(gotFunctions(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const defaultFunctions = []

/**
 * REDUCER
 */
export default function(state = defaultFunctions, action) {
  switch (action.type) {
    case GOT_FUNCTIONS:
      return action.payload
    case UPDATE_FUNCTION:
      const newState = [...state]
      newState.find(
        func => func.algoResultText === action.algoResultText
      ).userEditedText = action.userEditedText
      return newState
    default:
      return state
  }
}
