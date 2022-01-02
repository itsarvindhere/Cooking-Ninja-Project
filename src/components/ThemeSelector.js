//CSS
import './ThemeSelector.css';

//Custom useTheme hook
import { useTheme } from '../hooks/useTheme';

//Importing the icon
import modeIcon from '../assets/mode-icon.svg';

const themeColors = ['#58249c', '#249c6b', '#b70233'];
export const ThemeSelector = () => {
    const {mode, changeColor, changeMode} = useTheme();
    return (
        <div className='theme-selector'>
            <div className='mode-toggle'>
                    <img 
                    src={modeIcon} 
                    alt='Change to Light Mode or Dark Mode' onClick={() => changeMode(mode === 'dark' ? 'light' : 'dark')}
                    style={{filter: mode === 'dark' ? 'invert(100%)': 'invert(20%)'}}
                    />
            </div>
            <div className='theme-buttons'>
                {themeColors.map(color => (
                    <div 
                        key={color} 
                        onClick={() => changeColor(color)}
                        style={{ background: color }}
                    />
                ))}
            </div>
        </div>
    )
}
