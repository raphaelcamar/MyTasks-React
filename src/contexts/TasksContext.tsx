import React, {
  ContextType,
  createContext, ReactNode, useContext, useState,
} from 'react';
import { Context } from 'vm';

type Task = {
  id: number;
  name: string;
  description: string;
  data: Date;
  status: string;
  userId: number;
}

type TasksProviderProps = {
  children: ReactNode
}

type TaskContextProps = {
  tasks: Task[];
  createTask: (task: Task) => void;
  updateTask: (tasks: Task[]) => void;
  deleteTask: (tasks: Task[]) => void;
  instantiateTasks: (tasks: Task[]) => void;
}

export const TasksContext = createContext({} as TaskContextProps);

// TODO: Mudar tipos de any
export function TasksContextProvider({ children }: TasksProviderProps): ContextType<any> {
  const [tasks, setTasks] = useState([] as Task[]);

  function createTask(task: Task):void {
    setTasks([...tasks, task]);
  }

  function updateTask(task: Task[]):void {
    setTasks(task);
  }

  function deleteTask(task: Task[]):void {
    setTasks(task);
  }

  function instantiateTasks(task: Task[]):void {
    setTasks(task);
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
        instantiateTasks,
      }}
    >

      {children}

    </TasksContext.Provider>
  );
}

export const useTasksContext = (): Context => useContext(TasksContext);
