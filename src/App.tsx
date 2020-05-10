import React from "react";
// styles
import "./App.scss";
// components
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB";
import Logger from "./components/Logger/LoggerContainer";
import Provider from "./context/Context";
import Switch from "./components/Switch/SwitchContainer";

const App: React.FC = () => {
  return (
    <div className="App">
        <Provider>
          <Screen>
            <Switch/>
            <Logger />
            <FAB />
          </Screen>
        </Provider>
    </div>
  );
};

export default App;
