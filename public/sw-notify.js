// spool Push Notification Service Worker
var ICON_URL = "https://omar51128102008-cloud.github.io/pocketflow/notification-icon.png";

self.addEventListener("push", function(event) {
  var data = event.data ? event.data.json() : {};
  var title = data.title || "spool";
  var options = {
    body: data.body || "You have a new notification",
    icon: data.icon || ICON_URL,
    badge: data.badge || ICON_URL,
    vibrate: [200, 100, 200],
    data: { url: data.url || "/" },
    actions: data.actions || [],
    tag: data.tag || "spool-notification",
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  var url = event.notification.data && event.notification.data.url ? event.notification.data.url : "/";
  event.waitUntil(clients.matchAll({ type: "window" }).then(function(list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf("pocketflow") !== -1 && "focus" in list[i]) return list[i].focus();
    }
    return clients.openWindow("https://omar51128102008-cloud.github.io/pocketflow/");
  }));
});
