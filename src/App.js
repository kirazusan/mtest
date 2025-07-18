import React from 'react'; 
import { Route, Switch } from 'react-router-dom'; 
import MainPage from './components/MainPage/MainPage'; 

const App = () => { 
    return ( 
        <Switch> 
            <Route path="/" exact component={MainPage} /> 
        </Switch> 
    ); 
}; 

export default App;