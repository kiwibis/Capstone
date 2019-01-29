import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CODE = 'GET_CODE'

/**
 * ACTION CREATORS
 */
const getCode = imageInfo => ({type: GET_CODE, payload: imageInfo})

/**
 * THUNK CREATORS
 */
export const sendImage = imageFile => async dispatch => {
  try {
    const data = new FormData()
    data.append('file', imageFile, 'image')
    const res = await axios.post('/api/images', data)
    dispatch(getCode({text: res.data, image: imageFile}))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const defaultImage = {
  text: '',
  image: null
}

/**
 * REDUCER
 */
export default function(state = defaultImage, action) {
  switch (action.type) {
    case GET_CODE:
      return action.payload
    default:
      return state
  }
}
