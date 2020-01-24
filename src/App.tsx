import React from "react";
import { ThemeProvider } from "styled-components";
// styles
import "./App.scss";
import theme from "./styles/globalMixins";
// components
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB";
import Logger from "./components/Logger/Logger";
import Provider from "./context/Context";

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider>
          <Screen>
            <Logger />
            <FAB />
          </Screen>
        </Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
