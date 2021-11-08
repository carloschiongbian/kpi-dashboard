const wangi = {
    labels: [
      'Overdue',
      'Defective',
      'Damaged'
    ],
    datasets: [{
      label: 'Returns due to improper shipment and defective',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

const returns_config = {
    type: 'pie',
    data: wangi, 
    options:{
        responsive: true,
        maintainAspectRatio: false, 
    }
  };

  

  var return_chart = new Chart(
    document.getElementById("returnsChart"),
    returns_config
);

function renderPie(){
   let over = document.getElementById("overdue").value;
   let def = document.getElementById("defective").value; 
   let dam = document.getElementById("damaged").value;

   if(over !="" && def !="" && dam != ""){
    returns_config.data.datasets[0].data.push(over)
    returns_config.data.datasets[0].data.push(def)
    returns_config.data.datasets[0].data.push(dam)
    return_chart.update()
      document.getElementById("overdue").value = "";
      document.getElementById("defective").value = "";
     document.getElementById("damaged").value = "";
   }
   else(alert("invalid data"))
}

function resetPie(){
    returns_config.data.datasets[0].data = [];
    return_chart.update()
}