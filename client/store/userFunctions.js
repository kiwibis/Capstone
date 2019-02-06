import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_FUNCTIONS = 'GOT_FUNCTIONS'

/**
 * ACTION CREATORS
 */
const gotFunctions = functions => ({type: GOT_FUNCTIONS, payload: functions})

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
    default:
      return state
  }
}
