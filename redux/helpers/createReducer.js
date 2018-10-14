export default createReducer = (initialState, handlers) => {
    return reducer = (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        }
        return state
    }
}