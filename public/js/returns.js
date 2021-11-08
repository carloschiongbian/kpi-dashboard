var labels = ['Overdue','Defective','Damaged'];

var data = {
  labels: labels,
  datasets: [{
    label: 'Returns due to improper shipment and defective',
    data: [],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }],
};

var returns_config = {
  type: 'pie',
  data: data 

  // this makes the height infinitely increase for some reason
  // options:{
  //   responsive: true,
  //   maintainAspectRatio: false, 
  // }
};

var return_chart = new Chart(
  document.getElementById("returns-chart"),
  returns_config
);

function renderPie(){
  let over = document.getElementById("overdue").value;
  let def = document.getElementById("defective").value; 
  let dam = document.getElementById("damaged").value;

  if(over !="" && def !="" && dam != ""){
    returns_config.data.datasets[0].data.push(over);
    returns_config.data.datasets[0].data.push(def);
    returns_config.data.datasets[0].data.push(dam);
    return_chart.update();
    document.getElementById("overdue").value = "";
    document.getElementById("defective").value = "";
    document.getElementById("damaged").value = "";

  } else {
      alert("invalid data");
  }
}

function resetPie(){
    returns_config.data.datasets[0].data = [];
    return_chart.update();
}