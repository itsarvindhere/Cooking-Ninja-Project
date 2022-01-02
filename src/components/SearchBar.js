//CSS
import './SearchBar.css';

//React Imports

import {useState} from 'react';

//React Router Imports

import {useHistory} from 'react-router-dom';

export const SearchBar = () => {

    const [term, setTerm] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTerm('');
        history.push(`/search?s=${term}`)
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input type="text" id="search" onChange={(e) => setTerm(e.target.value)} value={term} required/>
            </form>
        </div>
    )
}


