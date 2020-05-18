import React  from "react";
import "./styles.scss";
import styled from "styled-components";

const S = styled.div`
  display: inline-block;
  padding: 1rem;
  color: teal;
  border-radius: 25px;
  margin: 2rem auto;
  background-color: rgba(250, 20, 250, 0.1);
`;

interface Props {
  handleClick: (e: any) => void;
}

const Switch: React.FC<Props> = ({ handleClick }) => {
  return (
    <S>
      Left Hand Mode
      <br />
      <br />
      <label className="switch">
        <input type="checkbox" onClick={(e) => handleClick(e)} />
        <span className="slider round"></span>
      </label>
    </S>
  );
};

export default Switch;
