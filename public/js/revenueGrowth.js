let revObj = JSON.parse(localStorage.getItem('revenueGrowth')) == null ? [] : JSON.parse(localStorage.getItem('revenueGrowth'));
let i = 0;
let globalObj = {
  labels: [],
  data: [],
  revenue: [],
  newLabels: []
}



const revdata = {
    labels: revObj.newLabels == null? []: revObj.newLabels ,
    datasets: [{
      label: 'Revenue Growth',
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
  let revD = document.getElementById("rev-date-input").value;
  let percentChange;
  let newLabels;
  
    if(revI != "" && revD != ""){

      globalObj.labels.push(revD);
      globalObj.revenue.push(revI);

      
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
        document.getElementById("rev-date-input").value = "";
    }
    else(alert("Please Input Revenue Data"))
}

function resetRev() {
    revenue_config.data.labels = [];
    revenue_config.data.datasets[0].data = [];
    localStorage.removeItem('revenueGrowth');
    reveChart.update();
     i = 0;
    document.getElementById("revenueInput").value = "";
    document.getElementById("rev-date-input").value = "";
    
}


