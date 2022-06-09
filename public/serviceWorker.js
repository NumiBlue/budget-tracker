const appName = "Budget-Tracker";
 const version = "v1";
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