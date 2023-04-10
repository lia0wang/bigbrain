
import React, { createContext } from 'react';

export const initialValue = {
  loaded: false,
  loggedIn: false,
};

export const Context = createContext(initialValue);
export const useContext = React.useContext;
