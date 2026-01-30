import firebaseConfig from "../firebaseConfig.js";
import { config } from '../config.js'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { subscribeToPush } from "./pushService.js";

class FirebaseCtrl {
  constructor() {
    this.token = undefined;
    this.onRecieveNotificationCb = undefined;
    this.onErrorCb = undefined;
    this.onGetTokenCb = undefined;
    this.tokenKey = "veoveo-notification-token";
    this.onAllowedCb=undefined;
  }

  async initApp() {
    // console.log('Iniciando Firebase app...');

    // if (Capacitor.isNativePlatform()) {
    //   const savedToken = await SecureStoragePlugin
    //     .get({ key: this.tokenKey })
    //     .catch((err) => {
    //       console.warn('No se encontró token de notificación', err);
    //       return null;
    //     });
    //   if (savedToken) {
    //     console.log('Token de notificación encontrado en Storage capacitor. Refrescando firebase...');
    //     await this.enableMobileNotifications();
    //   }
    // } else {
    //   const savedToken = window.localStorage.getItem(this.tokenKey);
    //   if (savedToken) {
    //     console.log('Token de notificación encontrado en Local Storage. Refrescando firebase...');
    //     await this.enableWebNotifications();
    //   }
    // }

    // if (!this.token)
    //   await subscribeToPush();
  }

  async getToken() {
    if (!this.token) {
      if (Capacitor.isNativePlatform()) {
        await this.enableMobileNotifications();
      }
      else
        await this.enableWebNotifications();
    }
    return this.token;
  }

  async enableMobileNotifications() {
    PushNotifications.addListener("registration", (token) => {
      this.token = token.value;
      SecureStoragePlugin.set({
        key: this.tokenKey,
        value: token.value,
      });
      if (typeof this.onGetTokenCb === "function") {
        console.log('Token de Firebase obtenido');
        this.onGetTokenCb(token.value);
      }
    });

    PushNotifications.addListener("registrationError", (error) => {
      console.error(error);
      if (typeof this.onErrorCb === "function") {
        this.onErrorCb(`Ocurrió un error al habilitar las notificaciones. Reintentá nuevamente`);
      }
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Push received: ", notification);
        if (typeof this.onRecieveNotificationCb === "function") {
          this.onRecieveNotificationCb(notification);
        }
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notificationAction) => {
        console.log("pushNotificationActionPerformed: ", notificationAction);
        if (typeof this.onRecieveNotificationCb === "function") {
          this.onRecieveNotificationCb(notificationAction.notification);
        }
      }
    );

    const result = await PushNotifications.checkPermissions();
    if (result.receive !== "granted") {
      if (typeof this.onAllowedCb === "function") {
        this.onAllowedCb(false);
      }
      throw new Error('Permiso de notificaciones no concedido');
    };
    this.onAllowedCb(true);
    await PushNotifications.register();
  }

  async enableWebNotifications() {
    const supported = await isSupported();
    if (!supported ) {
      if (typeof this.onErrorCb === "function")
        this.onErrorCb(
          "Este navegador parece no cumplir los requerimientos para recibir notificaciones"
        );
      throw new Error('Firebase no soportado por navegador');
    }

    const permission = Notification.permission;
    if (permission !== "granted") {
      if (typeof this.onAllowedCb === "function") {
        this.onAllowedCb(false);
      }
      throw new Error('Permiso de notificaciones no concedido');
    };
    this.onAllowedCb(true);

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    try {
      this.token = await getToken(messaging, {
        vapidKey:
          config.VITE_VAPID_PUBLIC_KEY,
      });
    } catch (err) {
      console.error("An error occurred while retrieving token. ", err);
      if (typeof this.onErrorCb === "function") {
        this.onErrorCb(err.message);
      }
      return;
    }
    if (!this.token) {
      const error =
        "No registration token available. Request permission to generate one.";
      console.log(error);
      if (typeof this.onErrorCb === "function") {
        this.onErrorCb(error);
      }
      return;
    }
    console.log('Token firebase recibido');
    if (typeof this.onGetTokenCb === "function") {
      this.onGetTokenCb(this.token);
    }
    window.localStorage.setItem(this.tokenKey, this.token);
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("FROM ON SERVICEWORKER MESSAGE", event);
      if (typeof this.onRecieveNotificationCb === "function") {
        this.onRecieveNotificationCb(event.data);
      }
    });
  }

  async removeToken() {
    const returnValue = this.token;
    this.token = undefined;
    if (Capacitor.isNativePlatform()) {
        await SecureStoragePlugin.remove({ key: this.tokenKey })
        .catch((err) => console.error('Error eliminando capacitor storage: ', err));
    } else {
      window.localStorage.removeItem(this.tokenKey);
    }
    return returnValue;
  }

  onGetToken(cb) {
    if (typeof cb === "function") {
      this.onGetTokenCb = cb;
    }
  }

  onRecieveNotification(cb) {
    if (typeof cb === "function") {
      this.onRecieveNotificationCb = cb;
    }
  }

  onError(cb) {
    if (typeof cb === "function") {
      this.onErrorCb = (err) => {
        console.error(err);
        window.localStorage.removeItem(this.tokenKey);
        cb(err);
      };
    }
  }

  onAllowed(cb) {
    if (typeof cb === "function") {
      this.onAllowedCb = cb;
    }
  }
}

const FirebaseClient = new FirebaseCtrl();
export default FirebaseClient;