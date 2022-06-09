self.addEventListener("install", function (event) {
    console.log("Service worker installed!");
  });

  //Activate
  self.addEventListener("activate", function (event) {
    console.log("Service worker activated!");
  });