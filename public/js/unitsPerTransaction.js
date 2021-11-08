


let KPIdata = {
    labels: [],
    datasets: [{
      label: 'Average Units Per Transaction',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [],
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

    if (no_of_items != "" && no_of_transactions_input != "" && period != "") {

        result = calculateKPI(no_of_items, no_of_transactions_input);

        date = new Date(period);
        formattedDate = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
        
        units_per_transaction_config.data.labels.push(formattedDate);
        units_per_transaction_config.data.datasets[0].data.push(result);
        units_per_transaction_chart.update();

        document.getElementById("no-of-items-input").value = "";
        document.getElementById("no-of-transactions-input").value = "";
        document.getElementById("month-period-input").value = "";
    } else {
        alert("Please fill in all the inputs..")
    }
}

function resetLineChart() {
    units_per_transaction_config.data.labels = [];
    units_per_transaction_config.data.datasets[0].data = [];
    units_per_transaction_chart.update();

    document.getElementById("no-of-items-input").value = "";
    document.getElementById("no-of-transactions-input").value = "";
    document.getElementById("month-period-input").value = "";
    document.getElementById("month-input").min = "";
}