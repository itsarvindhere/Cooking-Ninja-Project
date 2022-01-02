//CSS
import './Details.css';

//React Hook
import { useState, useEffect } from 'react';
//React Router Imports
import {useParams, useHistory} from 'react-router-dom';

//Custom HOOK
import {useTheme} from '../../hooks/useTheme';

//Firestore 
import { db } from '../../firebase/config';

//loader image
import loader from '../../assets/loading.svg';
import editIcon from '../../assets/edit.svg';

const Details = () => {
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const {mode} = useTheme();

    const {id} = useParams();

    const history = useHistory();

    useEffect(() => {
        setIsPending(true);
        const recipesCollection = db.collection('recipes');
        const documentReference = recipesCollection.doc(id);
        const unsub = documentReference.onSnapshot(snapshot => {
            if(snapshot.exists){
                setIsPending(false);
                setRecipe(snapshot.data());
                setError(false);
                
            } else {
                setIsPending(false);
                setError("This Recipe does not exist in the database!")
            }
        })

        return () => {
            console.log("Cleanup");
            unsub();
        }
       
    }, [id])

    return (
        <div className={`recipe ${mode}`}>
           {error && <p className='error'>{error}</p>}
           {isPending && <div className='loader-image'>
                    <img 
                    src={loader} 
                    alt='Loading'
                    style={{filter: mode === 'dark' ? 'invert(100%)': 'invert(20%)'}}
                    />
                    </div>}
           {recipe && (
               <>
                    <h2 className='page-title'>{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook.</p>
                    <ul>
                    {recipe.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>
                    )}
                    </ul>
                    <p className='method'>{recipe.method}</p>
               </>
           )}
           <img 
                        className='edit-icon'
                        src={editIcon}
                        alt='Edit Recipe'
                        onClick={() => history.push(`/edit/${id}`)}
                        style={{filter: mode === 'dark' ? 'invert(100%)': 'invert(20%)'}}
                    />
        </div>
    )
}

export {Details};