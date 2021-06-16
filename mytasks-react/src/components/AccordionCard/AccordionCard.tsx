import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import styles from './accordionCard.module.scss';

  type AccordionCardProps = {
    task?: Task
  }

  type Task = {
    name: string;
    description: string;
    data: string;
    isFinished: string;
    importance: string;
    id: number
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
      },
      details: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      column: {
        flexBasis: '25%',
      },
      title: {
        flexBasis: '100%',
      },
      helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
      },
      link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      bottom: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    }),
  );

  export default function AccordionCard({ task }: AccordionCardProps){   

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={false}>
        <AccordionSummary  expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <div className={clsx(classes.column, classes.title)}>
            <p>{task.name}</p>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          {/* <div className={classes.column} /> */}
          <div className={classes.column}>
            {task.description}
          </div>
          <div className={clsx(classes.column, classes.helper, styles.test)}>
            <img src={`${'/canceled'}.svg`} alt={'canceled'} />
          </div>
        </AccordionDetails>
        <Divider />
        <div className={classes.bottom}>
          <AccordionActions>
            {task.importance} | <span>{task.data}</span>
          </AccordionActions>
          <AccordionActions>
          <Button size="small" color="secondary">Excluir</Button>
          <Button size="small" color="inherit">Editar</Button>
        </AccordionActions>
        </div>
      </Accordion>
    </div>
  )
}