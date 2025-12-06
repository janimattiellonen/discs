import React, { Suspense } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { DiscsProvider, DiscFormProvider, ReferenceDataProvider, ImageUploadProvider } from './contexts';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { DiscGalleryPage } from './components/DiscGalleryPage';
import AppLayout from './components/containers/layouts/AppLayout';
import { AddDiscPage } from './components/AddDiscPage';
import { EditDiscPage } from './components/EditDiscPage';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ReferenceDataProvider>
                <DiscsProvider>
                    <DiscFormProvider>
                        <ImageUploadProvider>
                            <Auth0Provider
                                scope="write:discs"
                                cacheLocation="localstorage"
                                domain="mydiscs.eu.auth0.com"
                                clientId="8tOrpYhNEzrgkEWZMiPcW3KTXal3tfyD"
                                redirectUri={window.location.origin}
                                audience="my-discs"
                            >
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Router>
                                        <AppLayout>
                                            <Routes>
                                                <Route path="/" element={<DiscGalleryPage />} />
                                                <Route path="/gallery" element={<DiscGalleryPage />} />
                                                <Route path="/disc/new" element={<AddDiscPage />} />
                                                <Route path="/disc/:id/edit" element={<EditDiscPage />} />
                                            </Routes>
                                        </AppLayout>
                                    </Router>
                                </Suspense>
                            </Auth0Provider>
                        </ImageUploadProvider>
                    </DiscFormProvider>
                </DiscsProvider>
            </ReferenceDataProvider>
        </LocalizationProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
