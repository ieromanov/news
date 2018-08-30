import { combineReducers } from 'redux'
import * as LoggedOut from './loggedOut'
import * as SignUp from './signUp'

export default combineReducers(Object.assign(
    LoggedOut,
    SignUp
))