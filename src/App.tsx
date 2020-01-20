import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import "./App.scss";
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB";
import Logger from "./components/Logger/Logger";
import Provider from "./context/Context";

const App: React.FC = () => {
  const [open, toggleOpen] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);
  const store = { open, toggleOpen, log, setLog };

  const theme = {
    circleMixin: (p: string, bc: string) => `
    border-radius: 100%;
    padding: ${p};
    background-color: ${bc};
    `,
    centeredCircleMixin: () => `
    position: absolute;
    left: 0%;
    right: 0%;
    margin-left: auto;
    margin-right: auto;
    width: 0px;
    `,
    centeredIconMixin: () => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `
  };

  return (
    <div className="App">
      <Provider value={store}>
        <ThemeProvider theme={theme}>
          <Screen>
            <Logger />
            <FAB />
          </Screen>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
