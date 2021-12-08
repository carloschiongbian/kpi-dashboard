let gross_profit_data = (JSON.parse(localStorage.getItem('grossProfit')) == null) ? [] : JSON.parse(localStorage.getItem('grossProfit'));
/*const labeling = Utils.months({count: 12});*/
let datainfo = {
  labels:gross_profit_data.labels,
  datasets: [{
    label: 'Gross Profit',
    data: gross_profit_data.gross_profit,
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

//this function will update the GROSS PROFIT chart, and is triggered when submitting REVENUE
function updateGrossProfitChart(gross_profit, gross_profit_period) {

  grossProfit_config.data.datasets[0].data.push(gross_profit);
  grossProfit_config.data.labels.push(gross_profit_period);

  let gross_profit_data = {
    gross_profit: grossProfit_config.data.datasets[0].data,
    labels: grossProfit_config.data.labels
  };

  localStorage.setItem("grossProfit", JSON.stringify(gross_profit_data));

  grossChart.update();
}

function resetGrossProfitChart(){
  grossProfit_config.data.labels = [];
  grossProfit_config.data.datasets[0].data = [];
  localStorage.removeItem('grossProfit');
  grossChart.update();
}