import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBRTsGBPUFi29mIaQFcyuNntNcFE2vDIEo",
  authDomain: "prova-push-c0d9b.firebaseapp.com",
  projectId: "prova-push-c0d9b",
  storageBucket: "prova-push-c0d9b.appspot.com",
  messagingSenderId: "308525104851",
  appId: "1:308525104851:web:71856bdccffd54b3fd5e26",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const getTokenFunc = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BHCX-EUVPoyF35Dle9DFhURVR18XG3WhetYyxvKYD7X_YY3Do6edH3x5I3ZMl_eOB7qOjqy0yRI3mbQg9tCD-ME",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export default getTokenFunc;
