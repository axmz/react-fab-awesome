import React from "react";
import "./App.scss";
import Container from "./components/Container/Container";
import FAB from "./components/FAB/FAB";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container>
        <FAB/>
      </Container>
    </div>
  );
};

export default App;
