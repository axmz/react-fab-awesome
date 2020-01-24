import React, { useCallback, useState, createContext, useRef } from "react";
import { ReactNode, Dispatch, SetStateAction } from "react";
import { SpringHandle } from "react-spring";

export interface ContextType {
  Y: number;
  setY: (Y: number) => void;
  open: boolean;
  toggleOpen: Dispatch<SetStateAction<boolean>>;
  log: string[];
  setLog: Dispatch<SetStateAction<string[]>>;
  updateLog: (message: string) => void;
  collectedRefs: React.RefObject<SpringHandle>[];
  setCollectedRefs: Dispatch<SetStateAction<React.RefObject<SpringHandle>>[]>;
  collectRef: (ref: React.RefObject<SpringHandle>) => void;
  forgetRef: (ref: React.RefObject<SpringHandle>) => void;
}

interface Props {
  children: ReactNode;
  value?: ContextType;
}

export const Context = createContext<Partial<ContextType>>({});

const Provider: React.FC<Props> = ({ children }) => {
  const [Y, setY] = useState(0);
  const [open, toggleOpen] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);

  const [collectedRefs, setCollectedRefs] = useState<React.RefObject<SpringHandle>[]>([]);
  const collectRef = useCallback(
    (ref: React.RefObject<SpringHandle>) => {
      setCollectedRefs(collectedRefs => {
        if (!collectedRefs.includes(ref)) {
          collectedRefs = [...collectedRefs, ref];
        }
        return collectedRefs;
      });
    },
    [setCollectedRefs]
  );

  const forgetRef = useCallback(
    (ref: React.RefObject<SpringHandle>) => {
      setCollectedRefs(collectedRefs => {
        const index = collectedRefs.indexOf(ref);
        if (index >= 0) {
          collectedRefs = [
            ...collectedRefs.slice(0, index),
            ...collectedRefs.slice(index + 1)
          ];
        }
        return collectedRefs;
      });
    },
    [setCollectedRefs]
  );

  const updateLog = (message: string) => {
    setLog(prev => {
      const newArr = [...prev];
      newArr.push(message);
      return newArr;
    });
  };
  const store = {
    Y,
    setY,
    open,
    toggleOpen,
    log,
    setLog,
    updateLog,
    collectRef,
    forgetRef,
    collectedRefs
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
