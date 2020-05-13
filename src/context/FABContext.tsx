import React, { useCallback, useState, createContext } from "react";
import { ReactNode, Dispatch, SetStateAction } from "react";
import { SpringHandle, SpringValue } from "react-spring";

export interface ContextType {
  Y: SpringValue<number>;
  setY: (Y: SpringValue<number>) => void;
  collectedRefs: React.RefObject<SpringHandle>[];
  setCollectedRefs: Dispatch<SetStateAction<React.RefObject<SpringHandle>>[]>;
  collectRef: (ref: React.RefObject<SpringHandle>) => void;
  forgetRef: (ref: React.RefObject<SpringHandle>) => void;
}

interface Props {
  children: ReactNode;
}

export const Context = createContext<ContextType>({});

const Provider: React.FC<Props> = ({ children }) => {
  const [Y, setY] = useState<SpringValue<number>>();

  const [collectedRefs, setCollectedRefs] = useState<
    React.RefObject<SpringHandle>[]
  >([]);
  
  const collectRef = useCallback(
    (ref: React.RefObject<SpringHandle>) => {
      setCollectedRefs((collectedRefs) => {
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
      setCollectedRefs((collectedRefs) => {
        const index = collectedRefs.indexOf(ref);
        if (index >= 0) {
          collectedRefs = [
            ...collectedRefs.slice(0, index),
            ...collectedRefs.slice(index + 1),
          ];
        }
        return collectedRefs;
      });
    },
    [setCollectedRefs]
  );

  const store = {
    Y,
    setY,
    collectRef,
    forgetRef,
    collectedRefs,
  };
  
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
