import {
  makeStyles, IconButton, Menu, MenuItem, AppBar,
} from '@material-ui/core';
import React, { useState, useEffect, ReactElement } from 'react';
import MenuIcon from '@material-ui/icons/Menu';

import { useHistory } from 'react-router';

import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import { useProfile } from '../../contexts/UserContext';

type headerProps = {
  openDrawer: () => void;
  isOpen: boolean
}

const widthDrawer = 15;

const useStyles = makeStyles((theme) => ({

  header: {
    width: '100%',
    background: theme.palette.primary.dark,
    padding: '5px 0',

  },
  containerHeader: {
    width: '90%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',

  },
  icon: {
    color: 'white',
  },
  userOptions: {
    display: 'flex',
    alignItems: 'center',
  },
  appBar: {
    background: theme.palette.primary.light,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${widthDrawer}%)`,
    marginLeft: `${widthDrawer}%`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),

    '@media screen and (max-width: 1200px)': {
      width: '100%',
      marginLeft: '0',
    },
  },
}));

export default function Header({ openDrawer, isOpen }: headerProps): ReactElement {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useHistory();
  const { logout, profile } = useProfile();
  const [page, setPage] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(): void {
    setAnchorEl(null);
  }

  function logoutUser(): void {
    logout();
    router.push('/');
  }

  function setTitle(): void {
    const currentRoute = router.location.pathname.split('/');
    const currentPage = currentRoute[currentRoute.length - 1];
    switch (currentPage) {
      case 'tasks':
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

  useEffect(() => {
    setTitle();
  }, []);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isOpen,
      })}
    >
      <header className={classes.header}>
        <div className={classes.containerHeader}>
          <IconButton onClick={openDrawer}>
            <MenuIcon className={classes.icon} color="inherit" />
          </IconButton>
          <h2>{page}</h2>
          <div className={classes.userOptions}>
            <p>{profile.name}</p>
            <IconButton onClick={handleClick}>
              <ExpandMore className={classes.icon} color="inherit" />
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
    </AppBar>
  );
}
