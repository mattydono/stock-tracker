class StockAPI {
    constructor() {
        this.ticker = null;
        this.flag = {};
        this.polling = {};
        this.activeChartRange = null;
    }

    async fetchData (endpoint, cb, fetchOnce = false) {
        try {
            const result = await fetch(`/stock/${this.ticker}/${endpoint}`).then(res => res.json());
            if (this.flag[`${this.ticker}`][endpoint] || fetchOnce) cb(result)
        } catch (e) {
            if (this.flag) console.log(endpoint, 'fetch failure')
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

    subscribeToTicker(ticker, callbacks) {
        const { company, quote, news, peers } = callbacks;
        this.subscribe(ticker, quote, 'quote', 5000);
        this.subscribe(ticker, news, 'news', 30000);

        this.fetchData('company', company, true);
        this.fetchData('peers', peers, true);
    }

    unsubscribeToTicker(ticker) {
        this.unsubscribe(ticker, 'quote');
        this.unsubscribe(ticker, 'news');
    }

    subscribeToChart(ticker, range, cb) {
        this.activeChartRange = range;
        this.subscribe(ticker, cb, `chart/${range}`, 10000);
    }

    unsubscribeToChart(ticker) {
        this.unsubscribe(ticker, `chart/${this.activeChartRange}`);
        this.activeChartRange = null;
    }


}

export default StockAPI;