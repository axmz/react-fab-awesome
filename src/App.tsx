import React from "react";
import { ThemeProvider } from "styled-components";
// styles
import "./App.scss";
import theme from './styles/globalMixins';
// components
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB";
import Logger from "./components/Logger/Logger";
import Provider from "./context/Context";

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider>
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
