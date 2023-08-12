try {
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
  );

  // Initialize the Firebase app in the service worker by passing the generated config
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  };

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );

    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: "https://cdn.noron.vn/2020/09/16/909292452714178101-1600245613.png",
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });

  self.addEventListener("notificationclick", (event) => {
    console.log(event);
    return event;
  });
} catch (e) {
  console.log(e);
}
