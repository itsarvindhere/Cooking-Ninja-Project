//CSS
import './RecipeList.css';

//React Router Imports
import { Link, useHistory, useLocation } from 'react-router-dom';

//Custom Hooks
import {useTheme} from '../hooks/useTheme';

//Trashcan icon for delete operation
import deleteIcon from '../assets/delete.svg';
import editIcon from '../assets/edit.svg';


//Firebase
import {db} from '../firebase/config';
import { useState, useEffect } from 'react';



const RecipeList = ({recipes, isDeleted}) => {

    const {color, mode} = useTheme();
    const location = useLocation();
    const history = useHistory();
    const [addedRecipe, setAddedRecipe] = useState(null);
    const [updatedRecipe, setUpdatedRecipe] = useState(null);

    useEffect(() => {
        if(location.state) {
            if(location.state.addedRecipe) {
                setAddedRecipe(location.state.addedRecipe);
            } else if (location.state.updatedRecipe){
                setUpdatedRecipe(location.state.updatedRecipe);
            }
            setTimeout(() => {
                location.state = null;
                setAddedRecipe(null)
                setUpdatedRecipe(null)
            }, [3000])
        }
    }, [location])

    if(recipes.length === 0) {
        return <div className={`error ${mode}`}>No Recipies found...</div>
    }

    const handleDelete = async (id) => {
        setAddedRecipe(null);
        const collectionRef = db.collection('recipes');
        const docToDelete = collectionRef.doc(id);
        await docToDelete.delete();
    }
    
    return (
        <>
        <div className='delete-alert-container' style={{
            display: isDeleted ? 'flex' : 'none'
        }}>
         <div className={isDeleted ? 'delete-alert show' : 'delete-alert'}>
            {`Recipe Deleted!`}
        </div>
        </div>
        <div className='add-alert-container' style={{
            display: addedRecipe ? 'flex' : 'none'
        }}>
            <div className={addedRecipe ? 'add-alert show' : 'add-alert'}>
            {`Recipe ${addedRecipe ? 'for ' + addedRecipe.title : '' } Added!`}
        </div>
        </div>

        <div className='update-alert-container' style={{
            display: updatedRecipe ? 'flex' : 'none'
        }}>
            <div className={updatedRecipe ? 'update-alert show' : 'update-alert'}>
            {`Recipe Updated!`}
        </div>
        </div>
        
        <div className='recipe-list'>
            {recipes.map(recipe => {
                return <div key={recipe.id} className={`card ${mode}`}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method.substring(0,100)}...</div>
                    <Link 
                    to={`/details/${recipe.id}`}
                    style={{background: color, color: '#eee'}}
                    >Cook This</Link>
                    <img 
                        className='delete-icon'
                        src={deleteIcon}
                        alt='Delete Recipe'
                        onClick={() => handleDelete(recipe.id)}
                        style={{filter: mode === 'dark' ? 'invert(100%)': 'invert(20%)'}}
                    />

                    <img 
                        className='edit-icon'
                        src={editIcon}
                        alt='Edit Recipe'
                        onClick={() => history.push(`/edit/${recipe.id}`)}
                        style={{filter: mode === 'dark' ? 'invert(100%)': 'invert(20%)'}}
                    />
                </div>
            })}
        </div>
        </>
    )
}

export {RecipeList}
