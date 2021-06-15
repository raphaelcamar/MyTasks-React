import { Drawer } from '@material-ui/core';
import styles from './sidebar.module.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';
import PersonIcon from '@material-ui/icons/Person';
import Button from '../Button/Button';

export default function Sidebar({open}){
  
  return (
    <>
      <Drawer
        className={styles.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: styles.drawerPaper,
        }}
      >
        <h1>MyTasks</h1>

        <div className={styles.buttonContainer}>
          <Button onClick={() =>{}}>
            + Cadastrar tarefa
          </Button>
        </div>
        {/* <nav className={styles.navBar}>
          <a href="#">Minhas tarefas</a>
          <a href="#">Dashboards</a>
          <a href="#">Minhas informações</a>
        </nav> */}
        <ListItem button className={styles.item}> 
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="Minhas tarefas"/>
        </ListItem>

        <ListItem button className={styles.item}>
          <ListItemIcon >
            <DashboardIcon color={'inherit'} />
          </ListItemIcon>
          <ListItemText primary="Minhas tarefas"/>
        </ListItem>

        <ListItem button className={styles.item}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Minhas tarefas"/>
        </ListItem>
      <footer>
        <img src="/sideBar.svg" alt="Icone de sidebar" />
      </footer>
      </Drawer>
    </> 
  )
}