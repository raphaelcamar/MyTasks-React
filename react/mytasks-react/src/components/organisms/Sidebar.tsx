import React from 'react'
import { Drawer, ListItem, makeStyles, Theme } from '@material-ui/core'
import { useHistory } from 'react-router';
import MainButton from '../atoms/Button';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { ViewList } from '@material-ui/icons';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';

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

    '@media screen and (max-width: 1200px)': {
      width: '30%'
    }
  },

  item: {
    margin: '1rem 0',
    padding: '1rem 1rem',
  },

  active: {
    color: theme.palette.primary.light
  },

  drawerPaper: {
    width: '15%',

    '@media screen and (max-width: 1200px)': {
      width: '70%'
    }
  },

  buttonContainer: {
    padding: '0 1rem'
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    marginLeft: 'calc(15% / 2)',
  }

}));


export default function Sidebar({ open, close }) {

  const classes = useStyles();
  const router = useHistory();

  const getWidth = window.innerWidth

  const path = router.location.pathname

  const variant = getWidth > 1200 ? "persistent" : "temporary";

  console.log(path);

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant={variant}
        anchor="left"
        open={open}
        onClose={close}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <h1>MyTasks</h1>

        <div className={classes.buttonContainer}>
          <MainButton onClick={() =>{}}>
            + Cadastrar tarefa
          </MainButton>

          <Link to="/page/tasks">
            <ListItem button className={clsx(classes.item, `${path === '/page/tasks' ? classes.active : ''}`)}> 
              <ListItemIcon>
                <ViewList style={{color: path === '/page/tasks' ? '#2680eb': '' }}/>
              </ListItemIcon>
              <ListItemText primary="Minhas tarefas"/>
            </ListItem>
          </Link>

          <Link to="/page/dashboards">
            <ListItem button className={clsx(classes.item, `${path === '/page/dashboards' ? classes.active : ''}`)}> 
              <ListItemIcon>
                <DashboardIcon style={{color: path === '/page/dashboards' ? '#2680eb': '' }}/>
              </ListItemIcon>
              <ListItemText primary="Dashboards"/>
            </ListItem>
          </Link>

          <Link to="/page/infos">
            <ListItem button className={clsx(classes.item, `${path === '/page/infos' ? classes.active : ''}`)}> 
              <ListItemIcon>
                <PersonIcon style={{color: path === '/page/infos' ? '#2680eb': '' }} />
              </ListItemIcon>
              <ListItemText primary="Minhas tarefas"/>
            </ListItem>
          </Link>
        </div>

      </Drawer>
    </>
  )
}
