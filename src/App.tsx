import React, { useState } from "react";
import "./App.scss";
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB/Container";
import Logger from "./components/Logger/Logger";
import Provider from "./context/Context";

const App: React.FC = () => {
  const [open, toggleOpen] = useState<boolean>(false);
  const [log, setLog] = useState<string>("");
  const store = { open, toggleOpen, log, setLog };

  return (
    <div className="App">
      <Provider value={store}>
        <Screen>
          <Logger />
          <FAB />
        </Screen>
      </Provider>
    </div>
  );
};

export default App;
