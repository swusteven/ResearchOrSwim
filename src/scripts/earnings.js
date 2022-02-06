class Earnings  {
    constructor(ticker){
        this.ticker = ticker;
        this.retrieveEarningdata(ticker);
        this.earningAmount = [];
        this.earningYear = [];
        debugger
    }

    retrieveEarningdata(ticker){
        const apiURL = "https://finnhub.io/api/v1";
        const token = "sandbox_c7vfjqiad3i9ikp81lg0"
        const endPoint = `/stock/financials?symbol=${ticker}&statement=ic&freq=annual`

        fetch(`${apiURL}${endPoint}&token=${token}`)
            .then(res => res.json())
            // .then(data => console.log(data));
            .then(data => showData(data.financials))


        function showData(data){
        data.forEach(element => {
            const el = document.querySelector(".test");
            const newLi = document.createElement("li");
            
            newLi.innerText = `Year: ${element.year} - ${element.revenue}`;
            el.appendChild(newLi);
        });
        }
    }

   
      
    static classMethod(){
        // ...logic not specific to an instance
    }
}






export default Earnings