/**
 * @author seancabalse
 * @email seancabalse.dev@gmail.com
 * @create date 2023-11-22 11:05:44
 * @modify date 2023-11-22 11:05:44
 * @desc This houses the code for the user signed in
 * provider. This is concerned primarily on the determnining if there is a signed
 * in user and its details.
 */


import React, { useState, useContext, createContext, useMemo, } from "react";
import { User } from "@/models/user.model";


export interface ISignedInUserContext  { 
  isSignedIn: boolean | null; 
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean | null>>; 
  userData: User | null | undefined; 
  setUserData: React.Dispatch<React.SetStateAction<User | null | undefined>>; 
}

interface IProviderProps {
  children: React.ReactNode;
}

const SignedInUserContext = createContext<ISignedInUserContext | null>(null);

/**
* Wrapper method that can be used to wrap the main appliation with an
* authenticated context
* @param { children } - React.JSX.Element that will be wrapped.
* @returns React.JSX.Element that has access to the CXS channel token
*/
export const SignedInUserProvider : React.FC<IProviderProps> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean |null>(false);
  const [userData, setUserData] = useState<User | null>();
  
  const userMemo = useMemo(
     () => ({ isSignedIn, setIsSignedIn, userData, setUserData }),
     [isSignedIn, userData]
  );

  return (
    <SignedInUserContext.Provider value={userMemo}>
      {children}
    </SignedInUserContext.Provider>
  );
};

/**
* Helper method to return the react provider context
* @returns useContext hook using AuthCo
*/
export const useSignedInUser = () => {
  return useContext(SignedInUserContext);
};
