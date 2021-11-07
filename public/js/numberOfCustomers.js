// reference for the function
var data = {
    labels: [],
    datasets: [{
        label: 'Number of Customers Retained',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

var config = {
    type: 'line',
    data: data,
};

var no_of_customers_chart = new Chart(
    document.getElementById("no-of-customers-chart"),
    config
);
// reference for the function

function numberOfCustomersRetained(){

    var number_of_customers = document.getElementById("no-of-customers-input").value;
    var month = document.getElementById("month-input").value;

    if(number_of_customers != "" && month != ""){

        document.getElementById("month-input").min = month;

        var new_data = {
            customers: [],
            labels: []
        };

        data.labels.push(month);
        data.datasets[0].data.push(number_of_customers);

        data.datasets[0].data.forEach(data => {
            new_data.customers.push(data);
        });

        data.labels.forEach(data => {
            new_data.labels.push(data);
        });
        
        no_of_customers_chart.config.data.datasets[0].data = new_data.customers;
        no_of_customers_chart.config.data.labels = new_data.labels;
        no_of_customers_chart.update();

        var number_of_customers = document.getElementById("no-of-customers-input").value = "";
        var month = document.getElementById("month-input").value = "";
    } else {
        alert("Please input values.");
    }
}

function resetChart(){
    var reset_data = {
        reset_cust: [],
        reset_labels: []
    };

    no_of_customers_chart.config.data.datasets[0].data = reset_data.reset_cust;
    no_of_customers_chart.config.data.labels = reset_data.reset_labels;
    no_of_customers_chart.update();
}