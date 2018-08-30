import createReducer from '../helpers/createReducer'
import * as types from '../actions/types'

export const notSignUpStatus = createReducer({}, {
    [types.SET_NOT_SIGN_UP_STATE](state, action) {
        return action;
    }
})