import './App.css';

//React Router
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Pages
import {Home} from './pages/recipie-home/Home';
import {Create} from './pages/create-recipe/Create';
import {Search} from './pages/search-recipes/Search';
import {Details} from './pages/recipe-details/Details';

//Components
import {Navbar} from './components/Navbar';
import { ThemeSelector } from './components/ThemeSelector';

//useTheme hook
import {useTheme} from './hooks/useTheme';

function App() {

  const {mode} = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>

      <Navbar />
      <ThemeSelector />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/create">
                <Create />
            </Route>

            <Route exact path="/edit/:id">
                <Create />
            </Route>

            <Route exact path="/search">
                <Search />
            </Route>

            <Route exact path="/details/:id">
                <Details />
            </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
