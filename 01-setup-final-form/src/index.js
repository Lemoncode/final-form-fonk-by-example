import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import { Playground } from './playground';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <div className="app">
    <Playground />
  </div>,
  rootElement
);
