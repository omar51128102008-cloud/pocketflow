// spool Push Notification Service Worker
var ICON = "https://omar51128102008-cloud.github.io/pocketflow/notification-icon.png";

self.addEventListener("push", function(event) {
  var data = event.data ? event.data.json() : {};
  var title = data.title || "spool";
  var options = {
    body: data.body || "You have a new notification",
    icon: data.icon || ICON,
    badge: data.badge || ICON,
    vibrate: [200, 100, 200],
    data: { url: data.url || "/", type: data.type || "general" },
    tag: data.tag || "spool-" + Date.now(),
    renotify: true,
    requireInteraction: true,
    actions: [],
  };

  // Rich actions based on notification type
  if (data.type === "booking") {
    options.actions = [
      { action: "view", title: "View" },
      { action: "confirm", title: "Confirm" },
    ];
  } else if (data.type === "message") {
    options.actions = [
      { action: "reply", title: "Reply" },
      { action: "view", title: "View" },
    ];
  } else if (data.type === "reminder") {
    options.actions = [
      { action: "view", title: "View Schedule" },
      { action: "dismiss", title: "Dismiss" },
    ];
  }

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  var action = event.action;
  var data = event.notification.data || {};
  var base = "https://omar51128102008-cloud.github.io/pocketflow/";

  var targetUrl = base;
  if (action === "view" && data.type === "booking") targetUrl = base + "#schedule";
  else if (action === "reply" || data.type === "message") targetUrl = base + "#inbox";
  else if (action === "view") targetUrl = base;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].url.indexOf("pocketflow") !== -1 && "focus" in list[i]) {
          list[i].focus();
          list[i].postMessage({ action: action, type: data.type });
          return;
        }
      }
      return clients.openWindow(targetUrl);
    })
  );
});
