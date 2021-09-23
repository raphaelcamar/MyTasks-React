import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserContextProvider } from './contexts/UserContext';
import { TasksContextProvider } from './contexts/TasksContext';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
