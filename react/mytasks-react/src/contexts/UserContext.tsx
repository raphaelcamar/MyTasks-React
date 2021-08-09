import { createContext, ReactNode, useContext, useState } from "react";

//TODO: revisar tipos
type UserContextData = {
  instanceProfile: (profile: User) => void
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
  const [profile, setProfile] = useState({} as User);
  const [isAuth, setIsAuth] = useState(false);

  function instanceProfile(profile: any){
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
