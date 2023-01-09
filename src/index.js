/* eslint-disable react/jsx-filename-extension */
import React, { Suspense } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';

import DiscGallery from './components/containers/DiscGalleryContainer';
import AppLayout from './components/containers/layouts/AppLayoutContainer';
import { AddDiscPage } from './components/AddDiscPage';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Provider store={store}>
                <Auth0Provider
                    cacheLocation="localstorage"
                    domain="mydiscs.eu.auth0.com"
                    clientId="8tOrpYhNEzrgkEWZMiPcW3KTXal3tfyD"
                    redirectUri={window.location.origin}
                >
                    <Suspense fallback={<div>Loading...</div>}>
                        <Router>
                            <AppLayout>
                                <Routes>
                                    <Route exact path="/" element={<DiscGallery />} />
                                    <Route path="/gallery" element={<DiscGallery />} />
                                    <Route exact path="/disc/new" element={<AddDiscPage />} />
                                </Routes>
                            </AppLayout>
                        </Router>
                    </Suspense>
                </Auth0Provider>
            </Provider>
        </LocalizationProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* eslint-enable react/jsx-filename-extension */
