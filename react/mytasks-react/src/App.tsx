import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import Button from './components/atoms/Button';
import Login from './components/templates/Login';
import theme from './theme';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Subscribe from './components/templates/Subscribe';
import MainPage from './components/templates/MainPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Switch>
        <Route path="/subscribe">
         <Subscribe />
        </Route>
        <Route path="/page">
          <MainPage/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
