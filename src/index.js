import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from 'react-service-worker';

import './index.css';
import App from './app/App';

const app = React.createElement(App);
ReactDOM.render(app, document.getElementById('root'));

registerServiceWorker().unregister();
