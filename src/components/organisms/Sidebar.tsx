import React, { ReactElement, useState } from 'react';
import {
  Drawer, Input, ListItem, makeStyles, Theme,
  ListItemIcon, ListItemText,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import { ViewList } from '@material-ui/icons';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import MainButton from '../atoms/Button';
import ModalCreateTask from './ModalCreateTask';

const useStyles = makeStyles((theme: Theme) => ({

  drawer: {
    width: '15%',
    flexShrink: 0,

    '& h1': {
      width: '100%',
      textAlign: 'center',
      padding: '3rem 0',
      color: theme.palette.primary.main,
    },

    '& a': {
      textDecoration: 'none',
      color: theme.palette.grey[100],
    },

    '@media screen and (max-width: 1200px)': {
      width: '30%',
    },
  },

  item: {
    margin: '1rem 0',
    padding: '1rem 1rem',
  },

  active: {
    color: theme.palette.primary.light,
  },
  activeLink: {

    '& .MuiTypography-root': {
      color: theme.palette.primary.light,
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.light,
    },
  },

  drawerPaper: {
    width: '15%',

    '@media screen and (max-width: 1200px)': {
      width: '70%',
    },
  },

  buttonContainer: {
    padding: '0 1rem',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    marginLeft: 'calc(15% / 2)',
  },

}));

const links = [
  {
    path: '/page/tasks',
    icon: <ViewList />,
    text: 'Minhas tarefas',
  },
  {
    path: '/page/dashboards',
    icon: <DashboardIcon />,
    text: 'Dashboards',
  },
  {
    path: '/page/infos',
    icon: <PersonIcon />,
    text: 'Minhas informações',
  },
];

type sideBarProps = {
  open: boolean
  close: boolean
}

export default function Sidebar({ open, close }: sideBarProps): ReactElement {
  const classes = useStyles();
  const router = useHistory();
  const [modal, setModal] = useState(false);

  const getWidth = window.innerWidth;

  function openModal() {
    setModal(true);
  }

  const variant = getWidth > 1200 ? 'persistent' : 'temporary';

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant={variant}
        anchor="left"
        open={open}
        onClose={close}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <h1>MyTasks</h1>

        <div className={classes.buttonContainer}>
          <MainButton onClick={() => openModal()}>
            + Cadastrar tarefa
          </MainButton>
        </div>

        {/* TODO: transformar em molecula */}
        {links.map((link) => (
          <NavLink to={link.path} activeClassName={classes.activeLink}>
            <ListItem button className={classes.item}>
              <ListItemIcon>
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
          </NavLink>
        ))}
      </Drawer>

      <ModalCreateTask isOpen={modal} close={() => setModal(false)} />
    </>
  );
}
