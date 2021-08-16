import { makeStyles, IconButton, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useProfile } from '../../contexts/UserContext';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({

  header: {
    width: '100%',
    background: theme.palette.primary.light,
    padding: '5px 0'
    
  },
  containerHeader: {
    width: '90%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white'

  },
  icon: {
    color: 'white',
  },
  userOptions: {
    display: 'flex',
    alignItems: 'center',
  }
}))

export default function Header(){

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useHistory();
  const { logout, profile } = useProfile();
  const [page, setPage] = useState<String>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setTitle();
  }, [])

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logoutUser(){
    logout();
    router.push('/');
  }

  function setTitle(){
    const currentRoute = router.location.pathname.split('/');
    const currentPage = currentRoute[currentRoute.length - 1];
    switch (currentPage) {
      case 'tasks' :
        setPage('Minhas tarefas');
        break;
      case 'dashboards':
        setPage('Dashboards');
        break;
      case 'settings':
        setPage('Configurações');
        break;
      default:
        setPage('MyTasks');
        break;
     }
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.containerHeader}>
          <IconButton>
            <MenuIcon className={classes.icon} color='inherit' />
          </IconButton>
          <p>{page}</p>
          <div className={classes.userOptions}>
            <p>{profile.name}</p>
            <IconButton onClick={handleClick}>
              <ExpandMoreIcon className={classes.icon} color='inherit' />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logoutUser}>Logout</MenuItem>

              {/* <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
          </div>
        </div>
      </header>
    </>
  )
};
