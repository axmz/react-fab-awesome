import React from "react";
import "./App.scss";
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB/Container";

const App: React.FC = () => {
  return (
    <div className="App">
      <Screen>
        <FAB/>
      </Screen>
    </div>
  );
};

export default App;
