const appName = "Budget-Tracker";
 const version = "v3";
 const CACHE_NAME = appName + version;
 const CACHE_FILES = [
   "./index.html",
   "./css/style.css",
   "./js/idb.js",
   "./js/index.js",
 ];



self.addEventListener("install", function (event) {
    console.log("Service worker installed!");
  });

  //Activate
  self.addEventListener("activate", function (event) {
    console.log("Service worker activated!");
  });

  //Remove old cache
  // Remove unwanted caches
  event.waitUntil(
      //figure out why depricated
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cache) {
          if (cache !== CACHE_NAME) {
            console.log("Cleaning Cache");
            return caches.delete(cache);
          }
        })
      );
      self.addEventListener("fetch", function (event) {
        console.log("Offline: Service Worker Fetching files");
      });
    })
  );

  // Fetch Cached Files
  event.respondWith(
    caches.match(event.request).then(function (request) {
      if (request) {
        // If there is cache, return cache
        return request;
      } else {
        // Else- fetch
        return fetch(event.request);
      }
    })
  );