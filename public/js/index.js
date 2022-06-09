let transactions = [];
 let myChart;

 fetch("/api/transaction")
   .then((response) => {
     return response.json();
   })
   .then((data) => {
     // save db data as global variable
     transactions = data;

     populateTotal();
     populateTable();
     populateChart();
   });
 function populateTotal() {
   // reduce transaction amounts to a single total value
   let total = transactions.reduce((total, t) => {
     return total + parseInt(t.value);
   }, 0);
   let totalEl = document.querySelector("#total");
   totalEl.textContent = total;
 }
 function populateTable() {
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";