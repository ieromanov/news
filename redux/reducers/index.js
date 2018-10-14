import { combineReducers } from 'redux'
import * as LoggedOut from './loggedOut'
import * as SignUp from './signUp'
import * as JournalSubscriptions from './journalSubscriptions'

export default combineReducers({
    ...LoggedOut,
    ...SignUp,
    ...JournalSubscriptions
})