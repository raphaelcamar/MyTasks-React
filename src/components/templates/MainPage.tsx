import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import React from 'react';
import Header from "../organisms/Header";
import Sidebar from "../organisms/Sidebar";
import { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core";
import clsx from 'clsx';
import PrivateRoute from "../atoms/PrivateRoute";
import Login from "./Login";
import Table from "../molecules/Table";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      display: 'flex',
    },
    drawerHeader: {
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      width: '90%',
      margin: '0 auto',
      height: 'calc(100vh - 6rem)',
    },
    content: {
      flexGrow: 1,
      //TODO: Criar isso no tema
      background:' #f7f7f7',
      paddingTop: '6rem',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -15 + '%',

      '@media screen and (max-width: 1200px)': {
        marginLeft: '-30%'
      },
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
}))


export default function MainPage(){

  const classes = useStyles();
  const [open, setOpen] = useState<Boolean>(false);

  function handleDrawerOpen(): void{
    setOpen(!open);
  }

  console.log('Rendering')

  return (
    <div className={classes.root}>
      <Header openDrawer={handleDrawerOpen} isOpen={open}/>
      <Sidebar open={open} close={handleDrawerOpen}/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader}>
        <Switch>
          <PrivateRoute path="/page/tasks" component={Table} />
          <Route path="/page/dashboards">
            <p>Dashboards</p>
          </Route>
          <Route path="/page/infos">
            <p>Infos</p>
          </Route>
        </Switch>
        </div>
      </main>
    </div>
  )
}