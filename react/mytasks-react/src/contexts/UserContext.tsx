import { createContext, ReactNode, useContext, useState } from "react";

//TODO: revisar tipos
type UserContextData = {
  instanceProfile: (profile: User, remember: boolean) => void,
  logout: () => void;
  profile: User,
  isAuth: boolean
}

type UserContextProviderProps = {
  children: ReactNode
}

type User = {
  id: number | null
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProviderProps){
  const [profile, setProfile] = useState({} as User);
  const [isAuth, setIsAuth] = useState(false);

  function instanceProfile(profile: User, remember: boolean): void{
    setProfile(profile);
    setIsAuth(true);
    if(remember){
      localStorage.setItem('@logged', JSON.stringify(profile));
    }
  }

  function logout(): void{
    setProfile({
      cpf: '',
      email: '',
      id: null,
      password: '',
      name: ''
    })
  }

  return (
    <UserContext.Provider
      value={{
        instanceProfile,
        logout,
        profile,
        isAuth,
      }}
    >

      {children}
      
    </UserContext.Provider>
  )
}

export const useProfile = () => {
  return useContext(UserContext);
}
