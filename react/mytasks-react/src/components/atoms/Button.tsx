import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core'

type buttonProps = {
  children?: ReactNode;
  onClick: () => void;
  buttonProps?: ButtonHTMLAttributes<any>;
}
const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: '100%',
    padding: '1rem',
    backgroundColor: theme.palette.primary.light,
    color: '#ffffff',
    borderStyle: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    outline: 'none',
    '&:hover': {
      background: theme.palette.primary.dark,
    },
   '&:active': {
      transform: 'scale(0.9)',
    },
  
    '&:disabled': {
      background: theme.palette.grey[100],
      cursor: 'not-allowed',
    }
  },
  loader:{
    fontSize: 0,
    padding: '1rem'
  }
}));

export default function MainButton({children, onClick, buttonProps}: buttonProps) {

  const classes = useStyles();

  return (
    <Button className={classes.button} onClick={onClick}>
      <div className={children === Symbol ? classes.loader : ''}>
      {children}
      </div>
    </Button>
  )
}
