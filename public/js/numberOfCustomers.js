let monthly_data = (JSON.parse(localStorage.getItem('numberOfCustomers')) == null) ? [] : JSON.parse(localStorage.getItem('numberOfCustomers'));
const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


// reference for the function
let data = {
    labels: monthly_data.labels == null? []: monthly_data.labels,
    datasets: [{
        label: 'Number of Customers Retained',
        data: (monthly_data.customers == null)? []: monthly_data.customers,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
};

let config = {
    type: 'line',
    data: data,
};

let no_of_customers_chart = new Chart(
    document.getElementById("no-of-customers-chart"),
    config
);
// reference for the function

let analysis_data = [];

function numberOfCustomersRetained(){

    var number_of_customers = document.getElementById("no-of-customers-input").value;
    var period = document.getElementById("month-input").value;

    if(number_of_customers != "" && period != ""){

        document.getElementById("month-input").min = period;

        date = new Date(period);
        let formattedDate = months[date.getMonth()] + "-" + date.getFullYear();
        
        no_of_customers_chart.config.data.labels.push(formattedDate);
        no_of_customers_chart.config.data.datasets[0].data.push(number_of_customers);
        no_of_customers_chart.update();

        let new_data = {
            customers: no_of_customers_chart.config.data.datasets[0].data,
            labels: no_of_customers_chart.config.data.labels
        };

        localStorage.setItem("numberOfCustomers", JSON.stringify(new_data));

        createAnalysis(number_of_customers, formattedDate);

        document.getElementById("no-of-customers-input").value = "";
        document.getElementById("month-input").value = "";
    } else {
        alert("Please input data in the text boxes provided.");
    }
}

function resetChart(){
    var reset_data = {
        reset_cust: [],
        reset_labels: []
    };
    document.getElementById("month-input").min = "";
    document.getElementById("month-input").value = "";
    document.getElementById("no-of-customers-input").value = "";
    document.getElementById("modal-body").innerText = "";
    localStorage.removeItem('numberOfCustomers');
    no_of_customers_chart.config.data.datasets[0].data = reset_data.reset_cust;
    no_of_customers_chart.config.data.labels = reset_data.reset_labels;
    analysis_data = [];
    no_of_customers_chart.update();
}

function createAnalysis(no_of_customers, date) {

    let new_data = {
        no_of_customers: no_of_customers,
        date: date
    };

    let new_div = document.createElement("div");

    new_div.innerText = 
        "There were " + new_data.no_of_customers +  " customers in " + new_data.date + 
        ((analysis_data.length > 0) ? calculateChange(new_data.no_of_customers) : "." ) ;

    analysis_data.push(new_data);

    document.getElementById("modal-body").appendChild(new_div);

}

function calculateChange(no_of_customers){
    let previous_month = analysis_data.length - 1;
    let previous_month_customers = analysis_data[previous_month].no_of_customers;
    let result = "";
    let percentage = 0;

    if(no_of_customers > previous_month_customers){
        let increase = no_of_customers - previous_month_customers;
        percentage = (increase / previous_month_customers) * 100;

    } else if(no_of_customers < previous_month_customers){
        let decrease = previous_month_customers - no_of_customers;
        percentage = (decrease / previous_month_customers) * 100;
        
    } else if(no_of_customers == previous_month_customers){
        percentage = 0;
    }

    if(percentage > 0) {
        result = ". The number of people increased by " + percentage.toFixed(2) + "%.";
    } else if(percentage < 0) {
        result = ". The number of people decreased by " + percentage.toFixed(2) + "%.";
    } else if(percentage == 0){
        result = ". There was no change in the amount of people." + no_of_customers;
    }

    return result;
}