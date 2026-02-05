import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { Capacitor } from "@capacitor/core";
import { AuthProvider } from './context/AuthContext'
import { ProfileProvider } from './context/ProfileContext.jsx';
import { NotificationsProvider } from './context/NotificationContext.jsx'
import { ColorProvider } from './context/ColorContext.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css'
import App from './App.jsx'

registerSW({
  immediate: true
})

if (Capacitor.isNativePlatform()) {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthProvider>
        <ProfileProvider>
          <NotificationsProvider>
            <ColorProvider>
              <App />
            </ColorProvider>
          </NotificationsProvider>
        </ProfileProvider>
      </AuthProvider>
    </StrictMode>,
  );
} else {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        cacheLocation="localstorage"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "openid profile email",
        }}
      >
        <AuthProvider>
          <ProfileProvider>
            <NotificationsProvider>
              <ColorProvider>
                <App />
              </ColorProvider>
            </NotificationsProvider>
          </ProfileProvider>
        </AuthProvider>
      </Auth0Provider>
    </StrictMode>,
  );
}