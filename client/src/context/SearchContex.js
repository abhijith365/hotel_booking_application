import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city: null,
    dates: [],
    option: {
        adult: null,
        children: null,
        room: null,
    }
}
export const SearchContext = createContext(INITIAL_STATE)


const searchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE)
    return (
        < SearchContext.Provider value={{ city: state.city, dates: state.dates, option: state.option, dispatch }}>
            {children}
        </SearchContext.Provider >
    )
}