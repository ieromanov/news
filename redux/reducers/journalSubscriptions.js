import createReducer from '../helpers/createReducer'
import * as types from '../actions/types'

export const journalSubscriptions = createReducer({}, {
    [types.JOURNAL_SUBSCRIPTIONS](state, action) {
        return action.payload;
    }
})