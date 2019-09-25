class StockAPI {
    constructor() {
        this.ticker = null;
        this.flag = {};
        this.polling = {};
    }

    async fetchData (endpoint, cb) {
        try {
            let res;
            if (this.flag[`${this.ticker}`][endpoint]) {
                res = await fetch(`/stock/${this.ticker}/${endpoint}`)
                    .then(res => res.json());
            }
            if (this.flag) cb(res)
        } catch (e) {
            if (this.flag) console.log('fetch failure')
        }
    }

    subscribe (ticker, cb, endpoint, delay) {
        this.ticker = ticker;
        this.flag[ticker] = this.flag[ticker] ? this.flag[ticker] : {};
        this.flag[ticker][endpoint] = true;
        this.fetchData(endpoint, cb);
        this.polling[ticker] = this.polling[ticker] ? this.polling[ticker] : {};
        this.polling[ticker][endpoint] = setInterval(() => this.fetchData(endpoint, cb), delay);
    }

    unsubscribe (ticker, endpoint) {
        this.flag[ticker][endpoint] = false;
        clearInterval(this.polling[ticker][endpoint]);
    }

    subscribeToCompany(ticker, cb) {
        this.subscribe(ticker, cb, 'company', 20000)
    }

    unsubscribeToCompany(ticker) {
        this.unsubscribe(ticker, 'company');
    }
}

export default StockAPI;