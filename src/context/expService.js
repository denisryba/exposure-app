import { createContext, useContext } from 'react';

const ExpServiceContext = createContext();

const useExpService = () => useContext(ExpServiceContext);

export {
  ExpServiceContext,
  useExpService
};