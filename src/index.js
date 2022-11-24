import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/index.css";
import { BrowserRouter } from 'react-router-dom';
import {store, pStore} from './redux/store';
import { Provider } from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import client from "./GraphQL/apolloClient";
import {PersistGate} from "redux-persist/integration/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={pStore}>
                <ApolloProvider client={client}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ApolloProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
