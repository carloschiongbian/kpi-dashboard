function calculateROR() {

    let ROR_data = (JSON.parse(localStorage.getItem('grossProfit')) == null) ? [] : JSON.parse(localStorage.getItem('grossProfit'));
    let displayROR = document.getElementById("ROR-data");
    let firstCost = document.getElementById("first-cost-input").value;

    if(ROR_data.gross_profit.length != 0 && firstCost != ""){

        //this prevents this function from creating repetitive divs
        while (displayROR.hasChildNodes()) {  
            displayROR.removeChild(displayROR.firstChild);
        }

        let sumOfGrossProfits = 0;

        ROR_data.gross_profit.forEach(data => {
            sumOfGrossProfits += parseInt(data);        
        });

        let new_div = document.createElement("div");
        let ROR = parseInt(sumOfGrossProfits) / parseInt(firstCost);
        new_div.innerText = 
            "Based on the gross profit data, and the first cost, the rate of return is " + 
            ROR + "%";
        ;

        displayROR.appendChild(new_div);

        
        

    } else {
        alert("Please set the value of the first cost.");
    }
}