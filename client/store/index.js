import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import code from './code'
import loading from './loading'
import userFunctions from './userFunctions'

const reducer = combineReducers({
  user,
  code,
  loading,
  userFunctions
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './code'
export * from './loading'
export * from './userFunctions'
