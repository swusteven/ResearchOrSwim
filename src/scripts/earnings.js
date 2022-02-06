class Earnings  {
    constructor(ticker){
        this.ticker = ticker;
        this.earningAmount = [];
        this.earningYear = [];
        this.retrieveEarningdata(ticker);
    }

    retrieveEarningdata(ticker){
        const apiURL = "https://finnhub.io/api/v1";
        const token = "sandbox_c7vfjqiad3i9ikp81lg0";
        const endPoint = `/stock/financials?symbol=${ticker}&statement=ic&freq=annual`;
        let that = this; 
          
        fetch(`${apiURL}${endPoint}&token=${token}`)
            .then(res => res.json())
            .then(data => 
                data.financials.forEach((element) => {
                    that.earningAmount.push(element.revenue);
                    that.earningYear.push(element.year); 
                })
            )
    };
}



export default Earnings