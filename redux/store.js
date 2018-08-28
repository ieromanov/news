import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger  } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

const loggedMiddleware = createLogger({predicate: (getState, action) => __DEV__})

const configureStore = (initialState) => {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
            loggedMiddleware
        )
    )
    return createStore(reducer, initialState, enhancer)
}

export default configureStore({})