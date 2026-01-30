import { createContext, useState, useContext, useEffect } from 'react';
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import FirebaseClient from '../services/firebaseCtrl';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => useContext(NotificationContext);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsAvailable, setNotificationsAvailable] = useState(false);
  const [allowed, setAllowed] = useState(true);
  const [ignoreAllowed, setIgnoreAllowed] = useState(false);

  const { user } = useAuth();

  const enableNotifications = async () => {
    if (Capacitor.isNativePlatform()) 
      await PushNotifications.requestPermissions();
    else 
      await Notification.requestPermission();

    FirebaseClient.initApp()
      .catch((err) => {
        console.error(`Error subscribing to push:`, err);
        const content = {
          title: 'Ups... Hubo un error',
          body: `Hubo un error al habilitar las notificaciones. Si están bloqueadas en la configuración de tu dispositivo, asegurate de habilitarlas manualmente`,
        }
        setIgnoreAllowed(true);
        setNotifications([{ content, type: 'danger', onConfirm: enableNotifications, confirmText: 'Reintentar' }, ...notifications]);
      })
  }

  const getNotification = () => {
    // if (!ignoreAllowed && !allowed && user)
    //   return {
    //     content: {
    //       title: 'Permiso de notificaciones',
    //       body: '¡Activá las notificaciones para enterarte del color del día y mucho más!'
    //     },
    //     type: 'info',
    //     onConfirm: enableNotifications,
    //     confirmText: 'Habilitar',
    //     onClose: () => setIgnoreAllowed(true)
    //   }
    return (notifications.length > 0) ? notifications[0] : null;
  };
  const discardNotification = () => {
    if (notifications.length > 0)
      setNotifications(notifications.slice(1, notifications.length));
  }

  useEffect(() => {
    const getAllowNotifications = async () => {
      const result = Capacitor.isNativePlatform()? 
        (await PushNotifications.checkPermissions())?.receive
        : Notification.permission;
      setAllowed(result === "granted");
    }
    getAllowNotifications();
  }, []);

  useEffect(() => {
    const addNotification = async (content) => setNotifications([...notifications, { content, type: 'info' }]);
    FirebaseClient.onRecieveNotification(addNotification);
    FirebaseClient.onAllowed(setAllowed);
  }, [notifications]);

  useEffect(() => {
    const updateNotificationsAvailable = () => setNotificationsAvailable((!ignoreAllowed &&!allowed && user) || (notifications?.length > 0));
    updateNotificationsAvailable();
  }, [notifications, allowed, user, ignoreAllowed]);

  return (
    <NotificationContext.Provider value={{ getNotification, discardNotification, notificationsAvailable, allowed }}>
      {children}
    </NotificationContext.Provider>
  );
}