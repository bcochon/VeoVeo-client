/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { createHandlerBoundToURL } from 'workbox-precaching'

// Required for injectManifest
precacheAndRoute(self.__WB_MANIFEST)

clientsClaim()

// SPA navigation fallback
registerRoute(
  new NavigationRoute(
    createHandlerBoundToURL('index.html')
  )
)

// 🔔 PUSH HANDLER
self.addEventListener('push', event => {
  if (!event.data) return

  const data = event.data.json()

  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Notification', {
      body: data.body,
      icon: '/VeoVeo192x192.png',
      data: data.url,
    })
  )
})

// 🖱 Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close()

  event.waitUntil(
    self.clients.openWindow(event.notification.data || '/')
  )
})
