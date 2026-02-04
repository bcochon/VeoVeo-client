import { config } from '../config.js'
import FirebaseClient from "../services/firebaseCtrl.js";

const usePushService = () => {
  async function subscribeToPush() {
    // console.log('Enviando suscripción push a servidor');
    // const token = await FirebaseClient.getToken();
    // if (!token) throw new Error("Error getting token");
    // const response = await requestWithTokenRetry(`${config.serverUrl}/subscribe`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token })
    // });
    // if (!response.ok) {
    //   throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
    // } else
    //   console.log(`Notificaciones activadas: ${response.status} ${response.statusText}`);
  }

  async function unsubscribeToPush() {
    // console.log('Solicitando desuscripción push a servidor');
    // const token = await FirebaseClient.removeToken();
    // if (!token) throw new Error("Error getting token");
    // const response = await requestWithTokenRetry(`${config.serverUrl}/subscribe`, {
    //   method: 'DELETE',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token })
    // });
    // if (!response.ok) {
    //   throw new Error(`Servidor respondió ${response.status} ${response.statusText}`);
    // } else
    //   console.log(`Push desuscripto: ${response.status} ${response.statusText}`);
  }

  return { subscribeToPush, unsubscribeToPush };

}

export default usePushService;
