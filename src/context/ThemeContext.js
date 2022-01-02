import {createContext, useReducer} from 'react';

export const ThemeContext = createContext();

//<ThemeContext.Provider /> -> this is the provider that it gives us that we can use to wrap the component tree

//Reducer Function
const themeReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_COLOR':
            return {...state, color: action.payload}
        case 'CHANGE_MODE':
            return {...state, mode: action.payload}
        default:
            return {...state}
    }
}


export function ThemeProvider({children}) {

    const [state, dispatch] = useReducer(themeReducer,{
        color: '#58249C',
        mode: 'dark'
    });

    const changeColor = (color) => {
        dispatch({
            type: 'CHANGE_COLOR',
            payload: color
        })
    }

    const changeMode = (mode) => {
        dispatch({
            type: 'CHANGE_MODE',
            payload: mode
        })
    }

    return (
    <ThemeContext.Provider value={{...state, changeColor, changeMode}}>
        {children}
    </ThemeContext.Provider>
    )
}