import React, {
  Context,
  ContextType,
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';

// TODO: revisar tipos
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
  email: string,
  name: string,
  tokenId: string,
  rememberMe: boolean
}

export const UserContext = createContext({} as UserContextData);

export function UserContextProvider({ children }: UserContextProviderProps): ContextType<any> {
  const [profile, setProfile] = useState({} as any);
  const [isAuth, setIsAuth] = useState(false);

  function getUserInStorage() {
    const user = localStorage.getItem('@logged') || sessionStorage.getItem('@logged');

    if (user) {
      setIsAuth(true);
      setProfile(JSON.parse(user));
      return JSON.parse(user);
    }
    return null;
  }

  function instanceProfile(data: LoginData): void {
    setProfile(data);
    setIsAuth(true);
    if (data.rememberMe) {
      localStorage.setItem('@logged', JSON.stringify(data));
    } else {
      sessionStorage.setItem('@logged', JSON.stringify(data));
    }
  }

  function logout(): void {
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
  );
}

export const useProfile = (): Context => useContext(UserContext);
