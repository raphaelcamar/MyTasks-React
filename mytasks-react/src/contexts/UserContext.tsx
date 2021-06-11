import { createContext, ReactNode, useContext, useState } from "react";

type UserContextData = {
  instanceUser: (user) => void
  user: {}
}

type UserContextProviderProps = {
  children: ReactNode
}

type User = {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProviderProps){
  const [user, setUser] = useState(null);

  console.log(user)

  function instanceUser(user){
    setUser(user);
  }

  return (
    <UserContext.Provider
      value={{
        instanceUser,
        user
      }}
    >

      {children}
      
    </UserContext.Provider>
  )
}

export const useProfile = () =>{
  return useContext(UserContext);
}
