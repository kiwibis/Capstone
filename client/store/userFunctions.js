import axios from 'axios'
/**
 * ACTION TYPES
 */
const UPDATE_FUNCTION = 'UPDATE_FUNCTION'
const DELETE_FUNCTION = 'DELETE_FUNCTION'

/**
 * ACTION CREATORS
 */
const updateFunction = (id, newEditedText) => ({
  type: UPDATE_FUNCTION,
  id,
  newEditedText
})

const deleteFunction = id => ({
  type: DELETE_FUNCTION,
  payload: id
})

/**
 * THUNK CREATORS
 */
export const updateFunctionInServer = (id, newEditedText) => async (
  dispatch,
  getState
) => {
  try {
    await axios.post('/api/trainingData', {
      initialText: getState().userFunctions.find(fn => fn.id === id)
        .initialText,
      editedText: newEditedText
    })
    dispatch(updateFunction(id, newEditedText))
  } catch (err) {
    console.error(err)
  }
}

export const deleteFunctionInServer = id => async dispatch => {
  try {
    await axios.delete(`/api/trainingData/${id}`)
    dispatch(deleteFunction(id))
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
    case 'GET_USER':
      return action.functions || []
    case UPDATE_FUNCTION:
      return state.map(fn => {
        if (fn.id === action.id) {
          fn.userEditedText = action.newEditedText
        }
        return fn
      })
    case DELETE_FUNCTION:
      return state.filter(fn => fn.id !== action.id)
    default:
      return state
  }
}
