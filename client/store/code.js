import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CODE = 'GET_CODE'
const SUBMIT_EDITED_TEXT = 'SUBMIT_EDITED_TEXT'

/**
 * ACTION CREATORS
 */
const getCode = imageInfo => ({type: GET_CODE, payload: imageInfo})

export const submitEditedText = editedText => ({
  type: SUBMIT_EDITED_TEXT,
  payload: editedText
})

/**
 * THUNK CREATORS
 */
export const sendImage = imageFile => async dispatch => {
  try {
    const data = new FormData()
    data.append('file', imageFile, 'image')
    const res = await axios.post('/api/images/read', data)
    dispatch(getCode({text: res.data, image: imageFile}))
    history.push('/editPage')
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
    case GET_CODE:
      return {...action.payload, editedText: ''}
    case SUBMIT_EDITED_TEXT:
      return {...this.state, editedText: action.payload}
    default:
      return state
  }
}
