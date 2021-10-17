import { ThemeProvider } from '@material-ui/core';
import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './components/templates/Login';
import theme from './theme';
import Subscribe from './components/templates/Subscribe';
import MainPage from './components/templates/MainPage';

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/subscribe">
            <Subscribe />
          </Route>
          <Route path="/page">
            <MainPage />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
