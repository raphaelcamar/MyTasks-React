import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/sidebar';
import clsx from 'clsx'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: ' 2rem',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -15 + '%',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },

    mainContent: {
      background:' #f7f7f7',
    }
  }),
);

export default function Layout({children}) {

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  function handleDrawerOpen(){
    setOpen(!open);
  }

  return (
    <div>
      <Head>
        <title>Minhas tarefas | MyTasks</title>
        <meta name="description" content="Visualize, edite e exclua sua tarefas. Com opção a todo momento de criar novas" />
      </Head>

      <div className={classes.root}>
        <Header handleClick={handleDrawerOpen} isOpen={open}/>
        <Sidebar open={open} />
        <main
          className={clsx(classes.content, classes.mainContent, {
            [classes.contentShift]: open,
            
          })}
        >
          <div className={classes.drawerHeader} />
            {children}
        </main>
      </div>
    </div>
  )
}
