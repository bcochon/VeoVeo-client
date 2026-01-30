import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import { AuthProvider } from './context/AuthContext'
import { NotificationsProvider } from './context/NotificationContext.jsx'
import { ColorProvider } from './context/ColorContext.jsx'

import './index.css'
import App from './App.jsx'

registerSW({
  immediate: true
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NotificationsProvider>
        <ColorProvider>
          <App />
        </ColorProvider>
      </NotificationsProvider>
    </AuthProvider>
  </StrictMode>,
);
