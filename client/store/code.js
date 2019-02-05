import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CODE = 'GOT_CODE'
const GOT_EDITED_TEXT = 'GOT_EDITED_TEXT'
const GOT_SERVER_ERROR = 'GOT_SERVER_ERROR'

/**
 * ACTION CREATORS
 */
const gotCode = imageInfo => ({type: GOT_CODE, payload: imageInfo})

const gotEditedText = editedText => ({
  type: GOT_EDITED_TEXT,
  payload: editedText
})

const gotServerError = error => ({
  type: GOT_SERVER_ERROR,
  payload: error
})

/**
 * THUNK CREATORS
 */
export const sendImage = imageFile => async dispatch => {
  try {
    const data = new FormData()
    data.append('file', imageFile, 'image')
    const res = await axios.post('/api/images', data)
    dispatch(gotCode({text: res.data, image: imageFile}))
  } catch (err) {
    dispatch(gotServerError(err.response.data))
  }
}

export const submitEditedText = editedText => async (dispatch, getState) => {
  try {
    const {text} = getState().code
    await axios.post('/api/trainingData', {
      initialText: text,
      editedText
    })
    dispatch(gotEditedText(editedText))
  } catch (err) {
    console.error(err)
  }
}
/**
 * INITIAL STATE
 */
const defaultImage = {
  text: '',
  editedText: '',
  image: null
}

/**
 * REDUCER
 */
export default function(state = defaultImage, action) {
  switch (action.type) {
    case GOT_CODE:
      return {...action.payload, editedText: ''}
    case GOT_EDITED_TEXT:
      return {...state, editedText: action.payload}
    case GOT_SERVER_ERROR:
      return {error: action.payload}
    default:
      return state
  }
}
