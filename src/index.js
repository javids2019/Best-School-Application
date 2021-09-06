import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './MyApp/auth/auth';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';

const store = createStore(reducer);

const app = (
    <AuthProvider>
        <Provider store={store}>
            <BrowserRouter basename={config.basename}>
                {/* basename="/mybestschool" */}
                <App />
            </BrowserRouter>
        </Provider>
    </AuthProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
