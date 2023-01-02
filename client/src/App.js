import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import  LandingPage  from './components/LandingPage'
import  Home  from './components/Home'
import CreateRecipe from './components/CreateRecipe';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Route exact path='/' component={LandingPage}/>
          <Route path='/home' component={Home}/>
          <Route path='/recipes' component={CreateRecipe}/>
      </div>
    </BrowserRouter>);
}

export default App;
