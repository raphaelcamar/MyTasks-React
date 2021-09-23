import { makeStyles, Modal } from '@material-ui/core';
import React, { ReactNode } from 'react'

type ModalCreateTask = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode
}

const useStyles = makeStyles((theme) => ({
   
}))

const ModalCreateTask = ({isOpen, close, children}: ModalCreateTask) => {
  const classes = useStyles();

  return (
   <Modal
    open={isOpen}
    onClose={close}

   >
    <div>
      {children}
    </div>
   </Modal>

  )
}

export default ModalCreateTask
