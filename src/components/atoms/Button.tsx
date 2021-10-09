import { KeyboardEvent, ReactNode } from 'react';
import { makeStyles, Theme, Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core'

type buttonProps = {
  children?: ReactNode;
  onClick: () => void;
  buttonProps?: ButtonProps;
  onKeyPress?: (e: KeyboardEvent) => void;
  disabled?: boolean
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
      transition: 'all ease 0.1s',
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

export default function MainButton(props: buttonProps) {

  const { onClick, children, disabled, onKeyPress } = props;

  const classes = useStyles();

  return (
    <Button className={classes.button} onKeyPress={onKeyPress} onClick={onClick} disabled={disabled}>
      <div className={children === Symbol ? classes.loader : ''}>
        {children}
      </div>
    </Button>
  )
}
