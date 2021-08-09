import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import Button from './components/atoms/Button';
import Login from './components/templates/Login';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login/>
    </ThemeProvider>
  );
}

export default App;
