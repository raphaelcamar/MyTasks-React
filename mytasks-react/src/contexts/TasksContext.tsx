import { createContext, ReactNode, useContext, useState } from "react";


export const TasksContext = createContext({});

export function TasksContexteProvider({ children }){

  return (
    <TasksContext.Provider
      value={{}}
    >

      {children}
      
    </TasksContext.Provider>
  )
}

export const useTasks = () =>{
  return useContext(TasksContext);
}
