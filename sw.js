importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC8Sh1-ufVJ_voLCcu3_W89011oQYEGn60",
  projectId: "vip-smook",
  messagingSenderId: "823462448927",
  appId: "1:823462448927:web:2d9a8b705cac3c6fef6a2a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "VIP SMOOK 🔔";
  const notificationOptions = {
    body: payload.notification?.body || "لديك تحديث جديد في المتجر.",
    icon: "./1792015651400.jpg",
    badge: "./1792015651400.jpg",
    vibrate: [200, 100, 200],
    dir: "rtl",
    lang: "ar"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
