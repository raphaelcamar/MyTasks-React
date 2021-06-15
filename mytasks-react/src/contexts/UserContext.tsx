import { createContext, ReactNode, useContext, useState } from "react";

type UserContextData = {
  instanceProfile: (profile) => void
  profile: User
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
  const [profile, setProfile] = useState(null);

  function instanceProfile(profile){
    setProfile(profile);
  }

  return (
    <UserContext.Provider
      value={{
        instanceProfile,
        profile
      }}
    >

      {children}
      
    </UserContext.Provider>
  )
}

export const useProfile = () =>{
  return useContext(UserContext);
}
