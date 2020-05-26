import React, { useContext } from "react";
// styles
import "./App.scss";
// components
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB";
import Logger from "./components/Logger/LoggerContainer";
import Switch from "./components/Switch/SwitchContainer";

// Context
import { Context } from "./context/Context";

// SVG / PNG / Emoji
//import doge from './assets/doge.png'
//import thinking from './assets/thinking.png'
import Emoji from "./components/FAB/Emoji/Emoji";
import { ReactComponent as Arrow } from "./assets/arrow.svg";
import { ReactComponent as Plus } from "./assets/plus.svg";
//
import { Clickable } from "./components/FAB/Container/Clickable";

// medium buttons
const Pretzel = () => <Emoji label={"fruit"} symbol={"🥨"}></Emoji>
const Pineapple = () => <Emoji label={"fruit"} symbol={"🍍"}></Emoji>
const Bacon = () =>  <Emoji label={"fruit"} symbol={"🥓"}></Emoji>

const App: React.FC = () => {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const { open, checked } = ctx;
  const toggleOpen = ctx.toggleOpen!;
  const updateLog = ctx.updateLog!;

  //////////////////////////////////////// handleClicks
  const handleButtonClick = (message: string) => {
    toggleOpen(!open);
    updateLog(message);
    updateLog("Open: " + !open);
  };

  const largeButton: Clickable = {
    id: 0,
    // icon: () => <img src={doge} width={"95%"}/>,
    icon: () => <Plus fill={"white"} width={"30%"} height={"30%"} />,
    cb: () => {
      updateLog("Large button clicked")
      updateLog("Open: " + !open);
    },
    styles: {backgroundColor: "yellowgreen"},
  };

  const mediumButtons = [
    {
      id: 0,
      icon: Pretzel,
      cb: () => handleButtonClick("Medium button clicked"),
      styles: {fontSize: "x-large"},
    }, // Text
    {
      id: 1,
      icon: Bacon,
      cb: () => handleButtonClick("Medium button clicked"),
      styles: {fontSize: "x-large"},
    }, // Emoji
    {
      id: 2,
      icon: Pineapple,
      cb: () => handleButtonClick("Medium button clicked"),
      styles: {fontSize: "x-large"},
    }, // SVG
  ];

  const smallButton: Clickable = {
    id: 0,
    // icon: () => <img src={thinking} width={"85%"}/>,
    icon: () => <Arrow fill={"white"} width={".6rem"} height={".6rem"} />,
    cb: () => handleButtonClick("Small button clicked"),
    styles: {backgroundColor: "tomato"},
  };

  const overlay: Clickable = {
    id: 0,
    cb: () => handleButtonClick("Overlay clicked"),
    styles: {}
  }

  return (
    <div className="App">
      <Screen>
        <Switch />
        <Logger />
        <FAB
          open={open ? true : false}
          left={!checked}
          overlay={overlay}
          mediumButtons={mediumButtons}
          smallButton={smallButton}
          largeButton={largeButton}
        />
      </Screen>
    </div>
  );
};

export default App;
