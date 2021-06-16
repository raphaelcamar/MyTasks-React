import { Drawer } from '@material-ui/core';
import styles from './sidebar.module.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ViewListIcon from '@material-ui/icons/ViewList';
import PersonIcon from '@material-ui/icons/Person';
import Button from '../Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx'

export default function Sidebar({open}){

  const router = useRouter();

  const path = router.pathname;
  
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
        <Link href="/page/Tasks">
          <ListItem button className={clsx(styles.item, `${path === '/page/Tasks' ? styles.active : ''}`)}> 
            <ListItemIcon>
              <ViewListIcon style={{color: path === '/page/Tasks' ? '#2680eb': '' }}/>
            </ListItemIcon>
            <ListItemText primary="Minhas tarefas"/>
          </ListItem>
        </Link>

        <Link href="/page/Dashboard">
          <ListItem button className={clsx(styles.item, `${path === '/page/Dashboard' ? styles.active : ''}`)}>
            <ListItemIcon >
              <DashboardIcon style={{color: path === '/page/Dashboard' ? '#2680eb': '' }}/>
            </ListItemIcon>
            <ListItemText primary="Dashboards"/>
          </ListItem>
        </Link>

        <Link href="/page/Profile">
          <ListItem button className={clsx(styles.item, `${path === '/page/Profile' ? styles.active : ''}`)}>
            <ListItemIcon>
              <PersonIcon style={{color: path === '/page/Profile' ? '#2680eb': '' }} />
            </ListItemIcon>
            <ListItemText primary="Meu perfil"/>
          </ListItem>
        </Link>
        <footer>
          <Image width={'auto'} height={'auto'} src="/sideBar.svg" alt="Icone de sidebar" />
        </footer>
      </Drawer>
    </> 
  )
}