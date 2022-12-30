import React, { Suspense } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';

import DiscGallery from './components/containers/DiscGalleryContainer';
import AppLayout from './components/containers/layouts/AppLayoutContainer';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
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
                                <Route exact path={`/`} element={<DiscGallery />} />
                                <Route path={`/gallery`} element={<DiscGallery />} />
                            </Routes>
                        </AppLayout>
                    </Router>
                </Suspense>
            </Auth0Provider>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
