import React, { createContext} from "react";
import { ReactNode, Dispatch, SetStateAction } from "react";

export interface ContextType {
  open: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
  log: string;
  setLog: Dispatch<SetStateAction<string>>;
}

interface Props {
  children: ReactNode;
  value: ContextType;
}

export const Context = createContext<Partial<ContextType>>({});

const Provider: React.FC<Props> = ({ value, children }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;