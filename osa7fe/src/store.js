import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import visibilityReducer from './reducers/visibilityReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  blog: blogReducer,
  visibility: visibilityReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
export default store
