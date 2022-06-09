// Connection
let db;

// Establish Connection 
const request = indexedDB.open("budget", 1);

// IF DB changes
request.onupgradeneeded = function (event) {
  // save 
  const db = event.target.result;
  // create an object store (table) called `new_funds`, set it to have an auto incrementing 
  db.createObjectStore("new_funds", { autoIncrement: true });
};

request.onsuccess = function (event) {
  // If db, save to db global variable
  db = event.target.result;

  // if app online,run sendTransaction()  to send local db data to api
  if (navigator.onLine) {
    // upload any remaining funds data
    sendTransaction();
  }
};

// Errors?
request.onerror = function (event) {
  console.log(event.target.errorCode);
};

// Change Funds w/out Internet 
function savedRecord(record) {
  // open new transaction
  const transaction = db.transaction(["new_funds"], "readwrite");

  // access `new_funds`
  const fOStore = transaction.objectStore("new_funds");

  // add record 
  fOStore.add(record);
}

function uploadFunds() {
  // open transaction
  const transaction = db.transaction(["new_funds"], "readwrite");


  const fOStore = transaction.objectStore("new_funds");

  // get all records 
  const getAll = fOStore.getAll();

 
  getAll.onsuccess = function () {
    // isend data to api server
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open another transaction
          const transaction = db.transaction(["new_funds"], "readwrite");
          // access new_funds 
          const fOStore = transaction.objectStore("new_funds");
          // clear all 
          fOStore.clear();

          alert("All saved funds has been submitted!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

// if app restarts online
window.addEventListener("online", uploadFunds);