import {useContext} from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
    const context = useContext(ThemeContext);
    //If we try to get the context outside the Provider, then this will be true!
    if(context === undefined){
        throw new Error("useTheme() must be used inside a ThemeProvider")
    }
    return context; 
}
