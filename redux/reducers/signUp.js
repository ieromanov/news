import createReducer from '../helpers/createReducer'
import * as types from '../actions/types'

export const signUpStatus = createReducer({}, {
    [types.SET_SIGN_UP_STATE](state, action) {
        return action;
    }
})