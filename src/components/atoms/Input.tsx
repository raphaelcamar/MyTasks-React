import { makeStyles } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme)=> ({

  containerInput: {
    display: 'flex',
    flexDirection: 'column',
 
  '& label': {
    paddingBottom: '0.5rem',
  },

  '& input': {
    borderWidth: '0.36px',
    borderColor: 'rgba(219, 219, 219, 0.36)',
    boxShadow: '5px 5px 3px -2px rgba(0, 0, 0, 0.31)',
    padding: '1rem',
    borderRadius: '3px',

    '&:focus': {
      outline: 'none',
      borderColor: theme.palette.primary.light
    },
  },

  span: {
      marginTop: '0.5rem',
      border: '1px solid var(--primary-error)',
      backgroundColor: 'var(--secundary-error)',
      padding: '1rem',
      textAlign: 'center',
      color: 'var(--primary-error)',
      fontSize: '0.95rem',
    },
  },

  error: {
    border: `1px solid ${theme.palette.error.main} !important`,
    // backgroundColor: `${theme.palette.error.light}`,

    // '&::placeholder': {
    //   color: theme.palette.error.dark
    // }
    
  },
  errorValidator: {
    color: theme.palette.error.main,
    marginTop: '8px',
  }
  }));

  type inputProps = {
    label: string;
    onChange : (arg: any) => void;
    inputprops?: InputHTMLAttributes<any>;
    validator?: boolean;
    messageValidator?: string;
  }

function Input({label, onChange, inputprops, validator, messageValidator}: inputProps){

  const classes = useStyles();

  return (
    <div className={classes.containerInput}>
      <label htmlFor={label}>{label}</label>
      <input
        {...inputprops}
        id={label}
        onChange={(v) => onChange(v) }
        className={validator === false ? classes.error : ''}
      />
      {validator === false && (
        <span className={classes.errorValidator}>{messageValidator}</span>
      )}
    </div>
   )
}

export default Input