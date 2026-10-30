// Service worker : garde l'application sur le téléphone pour qu'elle s'ouvre
// même sans réseau (au magasin). Les données du foyer, elles, sont gérées
// par Firebase, qui a son propre mode hors connexion.
// Changer VERSION à chaque mise en ligne force la mise à jour des fichiers.
const VERSION = "menu-v3";
const FICHIERS = ["./", "index.html", "recettes.js", "config-firebase.js", "manifest.webmanifest",
                  "icones/icone-192.png", "icones/icone-512.png", "icones/apple-touch-icon.png"];
// Scripts externes qu'on peut garder en cache (Firebase et le QR code)
const HOTES_EXTERNES = ["www.gstatic.com", "cdnjs.cloudflare.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(cles => Promise.all(cles.filter(c => c !== VERSION).map(c => caches.delete(c))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  const local = url.origin === self.location.origin;
  if (!local && !HOTES_EXTERNES.includes(url.hostname)) return;  // la base Firebase passe directement

  // La page : réseau d'abord (pour avoir la dernière version), cache si hors ligne
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request)
      .then(r => { const copie = r.clone(); caches.open(VERSION).then(c => c.put("index.html", copie)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Le reste : cache tout de suite, mise à jour en arrière-plan
  e.respondWith(caches.match(e.request).then(enCache => {
    const reseau = fetch(e.request).then(r => {
      if (r.ok) { const copie = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copie)); }
      return r;
    }).catch(() => enCache);
    return enCache || reseau;
  }));
});
