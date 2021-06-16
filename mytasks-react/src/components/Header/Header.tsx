import router from 'next/router';
import { useProfile } from '../../contexts/UserContext';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ExpandMore } from '@material-ui/icons';
import { useState } from 'react';
import clsx from 'clsx';

type HeaderProps = {
  handleClick : () => void;
  style?: {};
  isOpen: boolean;

}

const w = 15

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerHeader: {
      padding: '0 2rem',
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
    userActions: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }),
);

export default function Header({ handleClick, style, isOpen }: HeaderProps){
 
  const { instanceProfile, profile } = useProfile();
  const classes = useStyles();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null); 

  function logout(){
    setAnchor(null);
    instanceProfile({});
    router.push('/');
  }

  function handleMenu(event: React.MouseEvent<HTMLButtonElement>){
    setAnchor(event.currentTarget);
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
          <div className={classes.userActions}>
            <span>user</span>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleMenu}>
              <ExpandMore />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchor}
              keepMounted
              open={Boolean(anchor)}
              onClose={() => setAnchor(null)}
            >
              <MenuItem onClick={() => setAnchor(null)}>Profile</MenuItem>
              <MenuItem onClick={() => setAnchor(null)}>My account</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </AppBar>
  )
}