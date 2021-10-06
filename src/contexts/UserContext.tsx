import { createContext, ReactNode, useContext, useEffect, useState } from "react";

//TODO: revisar tipos
type UserContextData = {
  instanceProfile: (data: LoginData) => void,
  logout: () => void;
  profile: LoginData,
  isAuth: boolean,
  getUserInStorage : () => LoginData,
}

type UserContextProviderProps = {
  children: ReactNode
}

type LoginData = {
  email: String,
  name: String,
  tokenId: String,
  rememberMe: Boolean
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProviderProps){
  const [profile, setProfile] = useState({} as any);
  const [isAuth, setIsAuth] = useState(false);

  function getUserInStorage(){
    const user = localStorage.getItem('@logged') || sessionStorage.getItem('@logged');

    if(user){
      setIsAuth(true);
      setProfile(JSON.parse(user));
      return JSON.parse(user);
    }else{
      return null
    }
  }

  function instanceProfile(data: LoginData): void{
    setProfile(data);
    setIsAuth(true);
    console.log(data)
    if(data.rememberMe){
      localStorage.setItem('@logged', JSON.stringify(data));
    }else{
      sessionStorage.setItem('@logged', JSON.stringify(data))
    }
  }

  function logout(): void{
    setProfile(null);
    setIsAuth(false);
    localStorage.clear();
    sessionStorage.clear();
  }

  return (
    <UserContext.Provider
      value={{
        instanceProfile,
        logout,
        getUserInStorage,
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
