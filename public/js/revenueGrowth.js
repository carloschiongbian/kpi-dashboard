const revdata = {
    labels: [],
    datasets: [{
      label: 'Revenue Growth',
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

const revenue_config = {
    type: 'bar',
    data: revdata,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  var reveChart = new Chart(
    document.getElementById("revenueChart"),
    revenue_config
);

function submitRev(){
    let revI = document.getElementById("revenueInput").value;
    let revD = document.getElementById("rev-date-input").value;

    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


    if(revI != "" && revD != ""){

        date = new Date(revD);
        formattedDate = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();

        revenue_config.data.datasets[0].data.push(revI);
        revenue_config.data.labels.push(formattedDate);
        reveChart.update();
        document.getElementById("revenueInput").value = "";
        document.getElementById("rev-date-input").value = "";
    }
    else(alert("Please Input Revenue Data"))
}

function resetRev() {
    revenue_config.data.labels = [];
    revenue_config.data.datasets[0].data = [];
    reveChart.update();

    document.getElementById("revenueInput").value = "";
    document.getElementById("rev-date-input").value = "";
    
}
