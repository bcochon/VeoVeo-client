function required(name, value) {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`)
  }
  return value
}

export const config = {
  serverUrl: required('VITE_SERVER_URL', import.meta.env.VITE_SERVER_URL),
  vapidPublicKey: required('VITE_VAPID_PUBLIC_KEY', import.meta.env.VITE_VAPID_PUBLIC_KEY)
}
