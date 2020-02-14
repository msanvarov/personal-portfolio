import React from "react";
import {hydrate, render} from 'react-dom';
import App from "./app/App";
import * as worker from "./worker";

const rootElement = document.getElementById('root');
if (rootElement) {
    if (rootElement.hasChildNodes()) {
        hydrate(<App/>, rootElement);
    } else {
        render(<App/>, rootElement);
    }
}

worker.unregister();
