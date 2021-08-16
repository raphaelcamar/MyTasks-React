import { createContext, ReactNode, useContext, useState } from "react";


export const TasksContext = createContext({});

//TODO: Mudar tipos de any
export function TasksContexteProvider({ children }: any){

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
