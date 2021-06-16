import { createContext, ReactNode, useContext, useState } from "react";

type UserContextData = {
  instanceProfile: (profile) => void
  profile: User,
  isAuth: boolean
}

type UserContextProviderProps = {
  children: ReactNode
}

type User = {
  id: number
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProviderProps){
  const [profile, setProfile] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  function instanceProfile(profile){
    setProfile(profile);
    setIsAuth(true);
  }

  return (
    <UserContext.Provider
      value={{
        instanceProfile,
        profile,
        isAuth,
      }}
    >

      {children}
      
    </UserContext.Provider>
  )
}

export const useProfile = () =>{
  return useContext(UserContext);
}
