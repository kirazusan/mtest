

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MauiApp from './MauiApp';
import ButtonContainer from './ButtonContainer';

const App = ({ buttonValue }) => {
  if (!buttonValue) {
    throw new Error('buttonValue prop is required');
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MauiApp>
            <ButtonContainer buttonValue={buttonValue} />
          </MauiApp>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;