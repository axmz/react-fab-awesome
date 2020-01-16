import React from "react";
import "./App.scss";
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB/Container";
import Logger from "./components/Logger/Logger";

const App: React.FC = () => {
  return (
    <div className="App">
      <Screen>
        <Logger val={'text'}/>
        <FAB/>
      </Screen>
    </div>
  );
};

export default App;
