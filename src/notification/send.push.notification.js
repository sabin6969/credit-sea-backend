import firebaseApp from "../startup/firebase.js";
import admin from "firebase-admin";

const sendPushNotification = async (fcmToken, title, body) =>{
    try {
        const message = {
            notification:{
                title: title,
                body: body,
            },
            token: fcmToken,
        };
      const result =  await admin.messaging(firebaseApp).send(message);
      console.log(result);
    } catch (error) {
        return;
    }
}   

export default sendPushNotification;