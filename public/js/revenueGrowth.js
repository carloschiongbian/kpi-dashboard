let revObj = JSON.parse(localStorage.getItem('revenueGrowth')) == null ? [] : JSON.parse(localStorage.getItem('revenueGrowth'));
let i = 0;
var globalObj = {
  labels: [],
  data: [],
  revenue: [],
  newLabels: [],
  gross_profit: []
}

const revdata = {
    labels: revObj.newLabels == null? []: revObj.newLabels ,
    datasets: [{
      label: 'Revenue Growth (by percentage)',
      data: revObj.data == null? []: revObj.data,
      borderColor: 'rgb(75, 192, 192)',
    }]
  };

const revenue_config = {
    type: 'line',
    data: revdata,
    options: {},
  };

  var reveChart = new Chart(
    document.getElementById("revenueChart"),
    revenue_config
);


function calculateIndividualPercentageChange(initial, next) {
  let result = ((next - initial)/initial) * 100;
  return result;
}

function calculateAveragePercentageChange(i) {
  let value;
  value = parseFloat(calculateIndividualPercentageChange(globalObj.revenue[i], globalObj.revenue[i + 1])).toFixed(2);
  return value;
}

function createPeriod(i) {
  let newString = "Period "+globalObj.labels[i]+ " to " + globalObj.labels[i + 1];
  return newString;
}

function submitRev(){
  let revI = document.getElementById("revenueInput").value;
  let expenses = document.getElementById("expensesInput").value;
  let revD = document.getElementById("rev-date-input").value;
  let percentChange;
  let newLabels;
  
    if(revI != "" && revD != ""){

      globalObj.labels.push(revD);
      globalObj.revenue.push(revI);

      let grossProfit = parseInt(revI) - parseInt(expenses);
      document.getElementById("rev-date-input").min = revD;

      // ----------------------------------------------------------------------------------------------------------------
      //we call the updating function for GROSS PROFIT here so that we can get the total expense for a specific period
      updateGrossProfitChart(grossProfit, revD);
      // ----------------------------------------------------------------------------------------------------------------
      
      if (globalObj.revenue.length >= 2 ) {
        percentChange = calculateAveragePercentageChange(i);
        newLabels = createPeriod(i);
        globalObj.data.push(percentChange);
        globalObj.newLabels.push(newLabels);

        revenue_config.data.labels.push(newLabels);
        revenue_config.data.datasets[0].data.push(percentChange);
        reveChart.update();

        localStorage.setItem("revenueGrowth", JSON.stringify(globalObj));
 

        i++;
      }
      
      
      
        document.getElementById("revenueInput").value = "";
        document.getElementById("expensesInput").value = "";
        document.getElementById("rev-date-input").value = "";
    }
    else{
      alert("Please input data in the text boxes provided.");
    }
}

function resetRev() {

    resetGrossProfitChart();
    
    revenue_config.data.labels = [];
    revenue_config.data.datasets[0].data = [];
    localStorage.removeItem('revenueGrowth');
    reveChart.update();
     i = 0;
    document.getElementById("revenueInput").value = "";
    document.getElementById("expensesInput").value = "";
    document.getElementById("rev-date-input").value = "";
    
}


