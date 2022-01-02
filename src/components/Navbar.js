//React Router Imports
import {NavLink} from 'react-router-dom';

//Custom HOOK
import {useTheme} from '../hooks/useTheme';

//CSS
import './Navbar.css';

//Components
import { SearchBar } from './SearchBar';

   

const Navbar = () => {
     //Get Theme Context
     const {color} = useTheme();
    return (
        <div className='navbar' style={{background: color}}>
                <nav>
                        <NavLink to="/" className="logo">
                            <h1>Cooking Ninja</h1>
                        </NavLink>

                       <SearchBar />

                        <NavLink to="/create?action=create">
                            <p>Create Recipe</p>
                        </NavLink>

                </nav>
        </div>
    )
}

export {Navbar};