import React, { useContext, useState, useRef } from "react";
import "./styles.scss";
import styled from "styled-components";
import { Context } from "../../context/Context";

const S = styled.div`
  display: inline-block;
  padding: 1rem;
  color: teal;
  border-radius: 25px;
  margin: 2rem auto;
  background-color: rgba(250, 20, 250, 0.1);
`;

const Switch = () => {
  const ctx = useContext(Context);
  const setChecked = ctx.setChecked!;
  const updateLog = ctx.updateLog!;

  const handleClick = (e: any) => {
    setChecked(e.target.checked);
    updateLog('L/R hand mode changed')
  };

  return (
    <S>
      Left Hand Mode
      <br />
      <br />
      <label className="switch">
        <input type="checkbox" onClick={e => handleClick(e)} />
        <span className="slider round"></span>
      </label>
    </S>
  );
};

export default Switch;
