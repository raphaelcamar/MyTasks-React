import { makeStyles, Modal, Box, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import Input from '../atoms/Input'

type ModalCreateTask = {
  isOpen: boolean;
  close: () => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modal: {
    background: 'white',
    padding: '8px 32px',
    width: '50%'
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const ModalCreateTask = ({isOpen, close}: ModalCreateTask) => {
  const classes = useStyles();

  return (
   <Modal
    open={isOpen}
    onClose={close}
   >
        <Box className={classes.wrapper}>
          <Box className={classes.modal}>
            <Typography className={classes.title} variant={'body1'}>
              Informe os dados da sua tarefa
            </Typography>
            <Input label={'nome'} onChange={() => {}} validator={true} />
            <Input label={'nome'} onChange={() => {}} validator={true} />
            <Input label={'nome'} onChange={() => {}} validator={true} />
            <Input label={'nome'} onChange={() => {}} validator={true} />
            <Input label={'nome'} onChange={() => {}} validator={true} />
          </Box>
        </Box>
   </Modal>

  )
}

export default ModalCreateTask
