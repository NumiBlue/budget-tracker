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

    transactions.forEach((transaction) => {
        // create and populate a table row
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${transaction.name}</td>
        <td>${transaction.value}</td>
      `;
      tbody.appendChild(tr);
    });
  }
  function populateChart() {
    // copy array and reverse it
    let reversed = transactions.slice().reverse();
     let sum = 0;
        function populateChart() {
      let sum = 0;
   
      let labels = reversed.map((t) => {
        let date = new Date(t.date);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      });
      // create new for chart
      let data = reversed.map((t) => {
        sum += parseInt(t.value);
        return sum;
      });

      if (myChart) {
        myChart.destroy();
      }
      let ctx = document.getElementById("myChart").getContext("2d");

   myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Total Over Time",
          fill: true,
          backgroundColor: "#6666ff",
          data,
        },
      ],
    },
  });
}
if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  } else {
    errorEl.textContent = "";
}

// create record
let transaction = {
  name: nameEl.value,
  value: amountEl.value,
  date: new Date().toISOString(),
};
// go into negatives
if (!isAdding) {
    transaction.value *= -1;
  }
  // add to current array of data
  transactions.unshift(transaction);
  // run logic again
   populateChart();
   populateTable();
   populateTotal();

   //send to server
   fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
   })
   .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.errors) {
      errorEl.textContent = "Missing Information";
    } else {
      // clear form
      nameEl.value = "";
      amountEl.value = "";
    }
  })
  .catch((err) => {
    // if fetch fails, save
    saveRecord(transaction);
// clear form
nameEl.value = "";
amountEl.value = "";
});
  }

  document.querySelector("#add-btn").onclick = function () {
    sendTransaction(true);
  };
 
  document.querySelector("#sub-btn").onclick = function () {
    sendTransaction(false);
  };
 
  document.querySelector("#clear-btn").onclick = function () {
    console.log("Clearing transactions");
    // clearTransactions();
  };