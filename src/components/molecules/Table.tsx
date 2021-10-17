import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { useTasksContext } from '../../contexts/TasksContext';
import { useProfile } from '../../contexts/UserContext';
import useFetchUser from '../../customHooks/useFetch';

export default function TableTasks() {
  const { instantiateTasks, tasks } = useTasksContext();
  const { profile } = useProfile();
  const { fetchGet } = useFetchUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const result = await fetchGet(`/tasks/tokenId/${profile.tokenId}`, {});

    instantiateTasks(result.tasks);
  }
  function Row(row: any) {
    return (
      <>
        {/* Renderiza as linhas */}
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell align="left">{row.row.name}</TableCell>
          <TableCell align="left">{row.row.data}</TableCell>
          <TableCell align="left">{row.row.status}</TableCell>
          <TableCell align="left">Edit</TableCell>
          <TableCell align="left">delete</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit orientation="horizontal">
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Descrição
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.row.description}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  function CollapsibleTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Data</TableCell>
              <TableCell align="left">status</TableCell>
              <TableCell align="left">Editar</TableCell>
              <TableCell align="left">Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <>
      {CollapsibleTable()}
    </>
  );
}
