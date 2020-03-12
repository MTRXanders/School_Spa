import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import thunk from 'redux-thunk';
///import { createLogger } from 'redux-logger';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
//const middleWare = [thunk];
//if (process.env.NODE_ENV !== 'production') {
//    middleWare.push(createLogger())
//}

const store = configureStore();


ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    rootElement);

registerServiceWorker();

