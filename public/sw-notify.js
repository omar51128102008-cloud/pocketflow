// spool Push Notification Service Worker
var ICON = "https://omar51128102008-cloud.github.io/pocketflow/notification-icon.png";
var IMAGE = "https://omar51128102008-cloud.github.io/pocketflow/notification-icon-512.png";

self.addEventListener("push", function(event) {
  var data = event.data ? event.data.json() : {};
  var title = data.title || "spool";
  var options = {
    body: data.body || "You have a new notification",
    icon: data.icon || ICON,
    badge: data.badge || ICON,
    image: data.image || IMAGE,
    vibrate: [200, 100, 200],
    data: { url: data.url || "/" },
    tag: data.tag || "spool-" + Date.now(),
    renotify: true,
    requireInteraction: true,
    actions: [
      { action: "open", title: "Open spool" },
      { action: "dismiss", title: "Dismiss" }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  if (event.action === "dismiss") return;
  var url = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : "https://omar51128102008-cloud.github.io/pocketflow/";
  event.waitUntil(clients.matchAll({ type: "window" }).then(function(list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf("pocketflow") !== -1 && "focus" in list[i]) return list[i].focus();
    }
    return clients.openWindow(url);
  }));
});
