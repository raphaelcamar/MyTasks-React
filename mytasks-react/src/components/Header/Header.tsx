import router from 'next/router';
import { useProfile } from '../../contexts/UserContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import clsx from 'clsx';

type HeaderProps = {
  handleClick : () => void;
  style?: {};
  isOpen: boolean;

}

const w = 20

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  containerHeader: {
    width: '95%',
    margin: '0 auto',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBar: {
    background: '#2680eb',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${w}%)`,
    marginLeft: `${w}%`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}),
);

export default function Header({ handleClick, style, isOpen }: HeaderProps){
 
  const { instanceProfile, profile } = useProfile();
  const [openOptions, setOpenOptions] = useState(false);
  const classes = useStyles();
  // const [anchor, setAnchor] = useState<null | HTMLElement>(null); 

  function logout(){
    instanceProfile({});
    router.push('/');
  }
  
  return (
    <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isOpen,
        })}
      >
        <div className={classes.containerHeader}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() =>{ handleClick(); }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
          <h2>Header</h2>
          <p>Opções</p>
        </div>
      </AppBar>
  )
}