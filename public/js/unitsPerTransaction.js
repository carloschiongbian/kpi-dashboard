let obj = JSON.parse(localStorage.getItem('unitsPerTransact')) == null ? [] : JSON.parse(localStorage.getItem('unitsPerTransact'));
console.log(obj)

let transobj = {
    labels: [],
    data: []
};

let KPIdata = {
    labels: obj.labels == null? []: obj.labels ,
    datasets: [{
      label: 'Average Units Per Transaction',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: obj.data == null? []: obj.data ,
    }]
};


let units_per_transaction_config = {
    type: 'line',
    data: KPIdata,
    options: {}
};

let units_per_transaction_chart = new Chart(
    document.getElementById('unitsPerTransaction-chart'),
    units_per_transaction_config
);

function calculateKPI(no_of_items, no_of_transactions_input) {
    return parseInt(no_of_items) / parseInt(no_of_transactions_input);
}

function renderLineChart() {
    let no_of_items = document.getElementById("no-of-items-input").value;
    let no_of_transactions_input = document.getElementById("no-of-transactions-input").value;
    let period = document.getElementById("month-period-input").value;
    document.getElementById("month-period-input").min = period;

    let result;
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    if ((no_of_items != "" && no_of_transactions_input != "" && period != "") && (parseInt(no_of_transactions_input) < parseInt(no_of_items))) {

       

        result = calculateKPI(no_of_items, no_of_transactions_input);

        date = new Date(period);
        formattedDate = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
        
        units_per_transaction_config.data.labels.push(formattedDate);
        units_per_transaction_config.data.datasets[0].data.push(result);
        units_per_transaction_chart.update();

        transobj.data.push(result)
        transobj.labels.push(formattedDate)


        localStorage.setItem("unitsPerTransact", JSON.stringify(transobj));
        console.log(JSON.parse(localStorage.getItem('unitsPerTransact')));

        document.getElementById("no-of-items-input").value = "";
        document.getElementById("no-of-transactions-input").value = "";
        document.getElementById("month-period-input").value = "";
    } else {
        alert("Error! Something is wrong! Please Try again!")
    }
}

function resetLineChart() {
    units_per_transaction_config.data.labels = [];
    units_per_transaction_config.data.datasets[0].data = [];
    localStorage.removeItem('unitsPerTransact');
    units_per_transaction_chart.update();

    document.getElementById("no-of-items-input").value = "";
    document.getElementById("no-of-transactions-input").value = "";
    document.getElementById("month-period-input").value = "";
    document.getElementById("month-input").min = "";
}

function calculateIndividualPercentageChange(initial, next) {
    let result = ((next - initial)/initial) * 100;
    console.log("hello");
    return result;
}



function fontColor(str, color) {
    return '<span style="font-weight: bold; color: ' + color + '">' + str + '</span>';
}

function generateUTPAnalysis() {
    let values = [];

    let UTP_analysis = JSON.parse(localStorage.getItem('unitsPerTransact')) == null ? [] : JSON.parse(localStorage.getItem('unitsPerTransact'));
    
    for (let i = 0; i < UTP_analysis.data.length - 1; i++){
        let x = calculateIndividualPercentageChange(UTP_analysis.data[i], UTP_analysis.data[i+1]);
        values.push(x);
    }
    let sum = values.reduce((a, b) => a + b, 0)
    let averagePercentageChange =  sum / units_per_transaction_config.data.datasets[0].data.length;
    let firstDate = units_per_transaction_config.data.labels[0];
    let lastDate = units_per_transaction_config.data.labels[units_per_transaction_config.data.labels.length-1];

    
    let generateText = "Based on the data, from " + firstDate + " to " + lastDate + " the average growth of units per transaction is ";

    let addedText = "";
    if (averagePercentageChange < 0) {
        generateText = generateText + fontColor(averagePercentageChange.toFixed(2).toString(),"red") + "%.";
        addedText = generateText + " This indicates that there is a decline in a company's sales or earnings";
    } else if (averagePercentageChange > 0) {
        generateText = generateText + fontColor(averagePercentageChange.toFixed(2).toString(),"blue") + "%.";
        addedText = generateText + " This indicates that the company is improving and is likely to show higher earnings.";
    }
    document.getElementById("modal-units-per-transact-body").innerHTML = addedText;

    // $('#unitsPerTransaction-modal').modal('show');
}

