import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TaskManager } from './components/TaskManager/TaskManager';
import { Calculator } from './components/Calculator/Calculator';
import { MainPage } from './components/MainPage/MainPage';
import { LogDebugMessage } from './components/LogDebugMessage/LogDebugMessage';
import { FileManager } from './components/FileManager/FileManager';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/task-manager" component={TaskManager} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/main-page" component={MainPage} />
        <Route path="/log-debug-message" component={LogDebugMessage} />
        <Route path="/file-manager" component={FileManager} />
      </Switch>
    </Router>
  );
};

export default App;