import React, { useState, createContext } from "react";
import { ReactNode, Dispatch, SetStateAction } from "react";

export interface ContextType {
  open: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
  log: string[];
  setLog: Dispatch<SetStateAction<string[]>>;
  updateLog: (message: string) => void;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

const defaultContext : ContextType = {
  open: false,
  toggleOpen: () => {},
  log: [],
  setLog: () => {},
  updateLog: () => {},
  checked: false,
  setChecked: () => {}
}

interface Props {
  children: ReactNode;
}

export const Context = createContext<Partial<ContextType>>(defaultContext);

const Provider: React.FC<Props> = ({ children }) => {
  const [open, toggleOpen] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const updateLog = (message: string) => {
    setLog(prev => {
      const newArr = [...prev];
      newArr.push(message);
      return newArr;
    });
  };
  
  const store: ContextType = {
    open,
    toggleOpen,
    log,
    setLog,
    updateLog,
    checked,
    setChecked
  };
  
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
