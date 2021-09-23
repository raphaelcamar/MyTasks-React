import { createContext, ReactNode, useContext, useState } from "react";

type Task = {
  id: Number;
  name: String;
  description: String;
  data: Date;
  status: String;
  userId: Number;
}

type TasksProviderProps = {
  children: ReactNode
}

type TaskContextProps = {
  tasks: Task[];
  createTask: (task: Task) => void;
  updateTask: (tasks: Task[]) => void;
  deleteTask: (tasks: Task[]) => void;
  instantiateTasks:   (tasks: Task[]) => void;
}

export const TasksContext = createContext({} as TaskContextProps);

//TODO: Mudar tipos de any
export function TasksContextProvider({ children }: TasksProviderProps){

  const [tasks, setTasks] = useState([] as Task[]);

  function createTask(task: Task):void{
    setTasks([...tasks, task])
  }

  function updateTask(tasks: Task[]):void{
    setTasks(tasks);
  }


  function deleteTask(tasks: Task[]):void{
    setTasks(tasks);
  }

  function instantiateTasks(tasks: Task[]):void{
    setTasks(tasks);
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
  )
}

export const useTasksContext = () =>{
  return useContext(TasksContext);
}
