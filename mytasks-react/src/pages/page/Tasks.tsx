import styles from '../../pageStyles/tasks.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { useProfile } from '../../contexts/UserContext';
import { createStyles, Drawer, makeStyles, Theme, useTheme } from '@material-ui/core';
import Header from '../../components/Header/Header';
import clsx from 'clsx';
import Sidebar from '../../components/Sidebar/sidebar';

  //Percentage
  const drawerWidth = 20;

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
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth + '%',
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    }),
  );

export default function Tasks(){   

  // const { instanceProfile, profile } = useProfile();
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Head>
      <title>Minhas tarefas | MyTasks</title>
      <meta name="description" content="Visualize, edite e exclua sua tarefas. Com opção a todo momento de criar novas" />
      </Head>
      <div className={classes.root}>
        <Header handleClick={handleDrawerOpen} isOpen={open}/>
        <Sidebar open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        mainContent
      </main>
    </div>
    </>
  )
}