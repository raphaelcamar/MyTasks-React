import {
  makeStyles, Modal, Box, Typography,
} from '@material-ui/core';
import React, { ReactElement, ReactNode, useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import useFetchUser from '../../customHooks/useFetch';
import { useProfile } from '../../contexts/UserContext';
import { useTasksContext } from '../../contexts/TasksContext';

type ModalCreateTask = {
  isOpen: boolean;
  close: () => void;
}

type CreateTaskProps = {
  name: string;
  description: string;
  data: string;
  status: 'notStarted' | 'process' | 'finished' | 'canceled'
}

const useStyles = makeStyles((theme) => ({

  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    padding: '8px 32px',
    width: '50%',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    marginBottom: '2rem',
  },
  wrapperInputs: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '50px',
    flexDirection: 'row',
    marginBottom: '2rem',
  },
}));

const ModalCreateTask = ({ isOpen, close }: ModalCreateTask): ReactElement => {
  const classes = useStyles();
  const [createTaskProps, setCreateTaskProps] = useState({} as CreateTaskProps);
  const { fetchPost } = useFetchUser();
  const { profile } = useProfile();
  const { createTask } = useTasksContext();

  function handleChangeForm(type: string, value: string) {
    setCreateTaskProps({
      ...createTaskProps,
      [type]: value,
    });
  }

  async function handleSubmit() {
    console.log(profile.tokenId);
    const { task } = await fetchPost('tasks/new', {
      ...createTaskProps,
      tokenId: profile.tokenId,
    });
    createTask(task);
  }

  return (
    <Modal open={isOpen} onClose={close}>
      <Box className={classes.modal}>
        <Typography className={classes.title} variant="body1">
          Informe os dados da sua tarefa
        </Typography>
        <Box className={classes.input}>
          <Input
            inputprops={{
              placeholder: 'Nome',
              value: createTaskProps.name,
              type: 'text',
            }}
            label="nome"
            onChange={(e) => handleChangeForm('name', e.target.value)}
            validator
          />
        </Box>
        <Box className={classes.input}>
          <Input
            inputprops={{
              placeholder: 'Descrição',
              value: createTaskProps.description,
              type: 'text',
            }}
            label="Descrição"
            onChange={(e) => handleChangeForm('description', e.target.value)}
            validator
          />
        </Box>
        <Box className={classes.input}>
          <Input
            inputprops={{
              placeholder: 'Selecione a data',
              type: 'date',
              value: createTaskProps.data,
            }}
            label="Data"
            onChange={(e) => handleChangeForm('data', e.target.value)}
          />
        </Box>
        {/* TODO: transformar em um selector */}
        <Box className={classes.input}>
          <Input
            inputprops={{
              placeholder: 'Status',
              type: 'string',
              value: createTaskProps.status,
            }}
            label="Status"
            onChange={(e) => handleChangeForm('status', e.target.value)}
          />
        </Box>
        <Box className={classes.wrapperInputs}>
          <Button onClick={() => console.log('Close')}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>
            Send!
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCreateTask;
