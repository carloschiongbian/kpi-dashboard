/*const labeling = Utils.months({count: 12});*/
const datainfo = {
  label:[],
  datasets: [{
    labeling: 'Gross Profit',
    data: [],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
const grossProfit_config = {
    type: 'bar',
    data: datainfo,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
};
var grossChart = new Chart(
    document.getElementById("grossProfit"),
    grossProfit_config
);
function submitGross(){
    let revI = document.getElementById("revenue").value;
    let revD = document.getElementById("cost-of-goods").value;

    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


    if(revI != "" && revD != ""){

        date = new Date(revD);
        formattedDate = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();

        grossProfit_config.data.datasets[0].data.push(revI);
        grossProfit_config.data.labels.push(formattedDate);
        grossChart.update();
        document.getElementById("revenue").value = "";
        document.getElementById("cost-of-goods").value = "";
    }
    else(alert("Please Input Revenue Data"))
}

function resetGross() {
  grossProfit_config.data.labels = [];
  grossProfit_config.data.datasets[0].data = [];
  grossChart.update();

    document.getElementById("revenue").value = "";
    document.getElementById("cost-of-goods").value = "";
    
}
