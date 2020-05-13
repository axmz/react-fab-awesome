import React from 'react';

interface Props {
  label: string
  symbol: string
}

const Emoji: React.FC<Props> = props => (
    <div
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </div>
);

export default Emoji;