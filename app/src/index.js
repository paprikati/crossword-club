/* eslint-disable linebreak-style */
import React from 'react';
import Store from './top-level-app/Store';
import * as serviceWorker from './serviceWorker';
import {render} from 'react-dom';
import './styles.less';

render(<Store />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
