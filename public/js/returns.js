let retObj = JSON.parse(localStorage.getItem('returns')) == null ? [] : JSON.parse(localStorage.getItem('returns'));
let names = ['Overdue', 'Defective', 'Damaged'];

let product = {
  labels: names,
  datasets: [{ 
    data: retObj.data == null? []: retObj.data, 
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }],
};

let returns_config = {
  type: 'pie',
  data: product 

  // this makes the height infinitely increase for some reason
  // options:{
  //   responsive: true,
  //   maintainAspectRatio: false, 
  // }
};

let return_chart = new Chart(
  document.getElementById("returns-chart"),
  returns_config
);

function renderPie(){
  let over = document.getElementById("overdue").value;
  let def = document.getElementById("defective").value; 
  let dam = document.getElementById("damaged").value;

  if(returns_config.data.datasets[0].data.length == 0){
    if(over !="" && def !="" && dam != ""){
      returns_config.data.datasets[0].data.push(over);
      returns_config.data.datasets[0].data.push(def);
      returns_config.data.datasets[0].data.push(dam);
      return_chart.update();

      let obj = {
        data: returns_config.data.datasets[0].data
      };
      localStorage.setItem("returns", JSON.stringify(obj));
      console.log(localStorage.getItem('returns'))


      document.getElementById("overdue").value = "";
      document.getElementById("defective").value = "";
      document.getElementById("damaged").value = "";
  
    } else {
        alert("invalid data");
    }
  } else {
    if (over != "" && def != "" && dam != "") {
      
   
      new_over = parseInt(returns_config.data.datasets[0].data[0]) + parseInt(over);
      new_def = parseInt(returns_config.data.datasets[0].data[1]) + parseInt(def);
      new_dam = parseInt(returns_config.data.datasets[0].data[2]) + parseInt(dam);
      returns_config.data.datasets[0].data = [];
      return_chart.update();
      returns_config.data.datasets[0].data.push(new_over);
      returns_config.data.datasets[0].data.push(new_def);
      returns_config.data.datasets[0].data.push(new_dam);
      return_chart.update();

      let obj = {
        data: returns_config.data.datasets[0].data
      };
      localStorage.setItem("returns", JSON.stringify(obj));
      console.log(localStorage.getItem('returns'))

      document.getElementById("overdue").value = "";
      document.getElementById("defective").value = "";
      document.getElementById("damaged").value = "";
  
    } else {
        alert("invalid data");
    }
  }
}

function resetPie(){
  returns_config.data.datasets[0].data = [];
  localStorage.removeItem('returns');
  return_chart.update();
}