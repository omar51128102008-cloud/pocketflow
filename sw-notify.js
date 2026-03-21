// spool Push Notification Service Worker
self.addEventListener("push", function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "spool";
  const options = {
    body: data.body || "You have a new notification",
    icon: "/pocketflow/logo192.png",
    badge: "/pocketflow/logo192.png",
    vibrate: [200, 100, 200],
    data: { url: data.url || "/" },
    actions: data.actions || [],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.matchAll({ type: "window" }).then(function(list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.includes("pocketflow") && "focus" in list[i]) return list[i].focus();
    }
    return clients.openWindow(url);
  }));
});
