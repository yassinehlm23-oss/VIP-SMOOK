importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC8Sh1-ufVJ_voLCcu3_W89011oQYEGn60",
  authDomain: "vip-smook.firebaseapp.com",
  projectId: "vip-smook",
  storageBucket: "vip-smook.firebasestorage.app",
  messagingSenderId: "823462448927",
  appId: "1:823462448927:web:2d9a8b705cac3c6fef6a2a"
});

const messaging = firebase.messaging();

// استقبال الإشعار والتطبيق مغلق تماماً
messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || payload.data?.title || "VIP SMOOK 🔔";
  const options = {
    body: payload.notification?.body || payload.data?.body || "لديك تحديث جديد في المتجر!",
    icon: "./1792015651400.jpg",
    badge: "./1792015651400.jpg",
    vibrate: [200, 100, 200],
    dir: "rtl",
    lang: "ar",
    data: {
      url: payload.data?.url || "./index.html"
    }
  };

  return self.registration.showNotification(title, options);
});

// فتح التطبيق عند الضغط على الإشعار من شريط التنبيهات
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || './index.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
