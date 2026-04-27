function calculateCommission() {
  let sale = Number(document.getElementById("sale").value);

  let commissionRate;
  let commission;

  if (sale >= 6000000) {
    commissionRate = 10;
  } else if (sale >= 3000000) {
    commissionRate = 5;
  } else if (sale >= 1500000) {
    commissionRate = 3;
  } else {
    commissionRate = 1;
  }

  commission = sale * commissionRate / 100;
  let total = sale + commission;

  document.getElementById("rate").innerHTML = "Commission Rate: " + commissionRate + "%";
  document.getElementById("commission").innerHTML = "Commission: " + commission.toLocaleString() + " Riel";
  document.getElementById("total").innerHTML = "Total Amount: " + total.toLocaleString() + " Riel";
}