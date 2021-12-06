/*const labeling = Utils.months({count: 12});*/
let datainfo = {
  labels:[],
  datasets: [{
    label: 'Gross Profit',
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
    var monthly_revenue = document.getElementById("revenue").value;
    var COGS = document.getElementById("cost-of-goods").value;
    var month_period = document.getElementById("month-period").value;
    var investment = document.getElementById("investment").value;

    if(monthly_revenue != "" && COGS != ""){

        document.getElementById("month-period-input").min = month_period;

        date = new Date(month_period);
        let formattedDate = months[date.getMonth()] + "-" + date.getFullYear();

        let gross_profit = monthly_revenue - COGS;

        grossProfit_config.data.datasets[0].data.push(gross_profit);
        grossProfit_config.data.labels.push(formattedDate);
        grossChart.update();
        document.getElementById("revenue").value = "";
        document.getElementById("cost-of-goods").value = "";
        document.getElementById("month-period").value = "";

    } else if(investment != "" && month_period != ""){
      document.getElementById("month-period-input").min = month_period;
      date = new Date(month_period);
      let formattedDate = months[date.getMonth()] + "-" + date.getFullYear();

      grossProfit_config.data.datasets[0].data.push(investment);
      grossProfit_config.data.labels.push(formattedDate);
      grossChart.update();
      document.getElementById("investment").value = "";        
      document.getElementById("month-period").value = "";

    } else{
      alert("Please Input Revenue Data");
      
    }
    
    calculateIRR();
}

function calculateIRR(){

  let present_worth = 0;
  let capital_investment = datainfo.datasets[0].data[0];

  for(var x = 1; x < datainfo.datasets[0].data.length; x++){
    present_worth = present_worth + parseInt(monthly_cash_flow);  
  }

  datainfo.datasets[0].data.forEach(monthly_cash_flow => {
    present_worth = present_worth + parseInt(monthly_cash_flow); 
  });

  console.log(present_worth);
}

function resetGross() {
  grossProfit_config.data.labels = [];
  grossProfit_config.data.datasets[0].data = [];

  document.getElementById("revenue").value = "";
  document.getElementById("cost-of-goods").value = "";
  document.getElementById("month-period").value = "";
    
  grossChart.update();
}
