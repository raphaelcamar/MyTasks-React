import { createTheme } from "@material-ui/core";


//TODO: b9b9b9, f2f4f8
const theme = createTheme({
  palette: {
    primary: {
      main: '#0f4c81',
      light: '#2680eb',
      dark: '#2571cf',

    },
    error: {
      main: '#f31e2c',
      light: '#ef4e5981'
    },
    background: {
      default: '#FAFAFA',
      paper: '#F2F4F8'
    },
    success: {
      main: '#33c58b'
    },
    warning: {
      main: '#efa94e'
    },
    grey: {
      "100": 'rgb(150, 148, 148)'
    }
  },
  
});

export default theme;