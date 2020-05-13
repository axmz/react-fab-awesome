import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Provider, { Context } from "./context/Context";

ReactDOM.render(<Provider><App /></Provider>, document.getElementById('root'));

