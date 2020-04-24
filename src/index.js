import React from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import ReactDOM from 'react-dom';
import App from './App.js';
// var e = <h2>Hello</h2>
// ReactDOM.render(e, document.querySelector("#root"))

ReactDOM.render(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>

    ,document.querySelector("#root"))
