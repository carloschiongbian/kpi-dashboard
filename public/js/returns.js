let retObj = (JSON.parse(localStorage.getItem('returns')) == null) ? [] : JSON.parse(localStorage.getItem('returns'));
let names = ['Overdue', 'Defective', 'Damaged'];

let product = {
  labels: names,
  datasets: [{ 
    data: (retObj.data == null)? []: retObj.data, 
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
        alert("Please input data in the text boxes provided.");
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
      console.log(new_over+new_def+new_dam);
    
      document.getElementById("overdue").value = "";
      document.getElementById("defective").value = "";
      document.getElementById("damaged").value = "";
      
    } else {
        alert("Please input data in the text boxes provided.");
    }
  }
}

function resetPie(){
  returns_config.data.datasets[0].data = [];
  document.getElementById("return-modal-body").innerText = " ";
  localStorage.removeItem('returns');
  return_chart.update();
  document.getElementById("overdue").value = "";
      document.getElementById("defective").value = "";
      document.getElementById("damaged").value = "";
}

function generateAnalysis(){

  let over;
  let defective;
  let damaged;

  let analysis = (JSON.parse(localStorage.getItem('returns')) == null) ? [] : JSON.parse(localStorage.getItem('returns'));

  if(analysis == undefined){

    alert("no data provided for analysis");

  } else {
    if(analysis.data[0]<10){
      over = "The current returned items that are overdue is " +analysis.data[0]+ " which is not in a alarming level yet. Profits are normal";
    }
    else if(analysis.data[0]>10){
      over = "The current returned items that are overdue is " +analysis.data[0]+ " which is alarming. It is advised to improve order fulfillment process";
    }

    if(analysis.data[1]<10){
      defective = "The current returned items due to defect is "+analysis.data[1]+ " which is not in a alarming state. Profits are normal";
    }
    else if(analysis.data[1]>10){
      defective = "The current returned items due to defect is "+analysis.data[1]+ " This is alarming. please contact company behind the product defect";
    }
    if(analysis.data[2]<10){
      damaged = "The current damaged items is "+analysis.data[2]+ " which is not to be concerned about. Profits are normal";
    }
    else if(analysis.data[2]>10){
      damaged = "The current damaged items is "+analysis.data[2]+ " which is alarming. It is advised to improve order fulfillment process";
    }

    document.getElementById("return-modal-body").innerHTML = "<br>"+ over+"</br>"+"<br>"+defective+"</br>"+"<br>"+damaged+"</br>";

    $('#returnedItems-modal').modal('show');    
  }

}
 


