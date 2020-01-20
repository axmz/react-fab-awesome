import React, { useState, createContext } from "react";
import { ReactNode, Dispatch, SetStateAction } from "react";

export interface ContextType {
  open: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
  log: string[];
  setLog: Dispatch<SetStateAction<string[]>>;
  updateLog: (message: string) => void;
}

interface Props {
  children: ReactNode;
  value?: ContextType;
}

export const Context = createContext<Partial<ContextType>>({});

const Provider: React.FC<Props> = ({ children }) => {
  const [open, toggleOpen] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);
  const updateLog = (message: string) => {
    setLog(prev => {
      const newArr = [...prev];
      newArr.push(message);
      return newArr;
    });
  };
  const store = { open, toggleOpen, log, setLog, updateLog };
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
