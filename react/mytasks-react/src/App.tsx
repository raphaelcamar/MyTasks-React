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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Switch>
        <Route path="/subscribe">
          <p>SUbscribe!!</p>
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
