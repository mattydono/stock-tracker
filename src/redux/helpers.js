export const createURL = (symbols, endpoint, parameters) => {
    return `/stock/${Array.isArray(symbols) ? symbols.join(',') : symbols}/${endpoint}/${parameters ? parameters : ''}`
}

export const fetchData = async (url, callback, error, fetching) => {
    try {
        fetching(true);
        const response = await fetch(url);
        if(response.ok) {
            callback(await response.json());
            error(false);
        }
        else throw new Error(`fetching ${url.split('/')[3]} failed`)
    } catch (e) {
        error(e);
    } finally {
        fetching(false);
    }
}

export const fetchDataWrapper = async (url, callback, error, fetching) => {
    const wait = async ms => {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
    const fetchData = async (urln, n) => {
        try {
            return await fetch(urln).then(res => res.json());
        } catch (err) {
            if (n === 1) throw err;
            await wait(5000);
            return await fetchData(urln, n-1);
        }
    }
    try {
        fetching(true)
        const response = await fetchData(url, 10);
        callback(response);
        error(false)
    } catch (err) {
        error('error fetching data')
    } finally {
        fetching(false)
    }
}

export const getExpirationDate = (range) => {
    let date = new Date();
    if (range !== '1d') {
        const shouldAddDay = date.getUTCHours() >= 14 && (date.getUTCMinutes() >= 30 || date.getUTCHours() > 14);
        date.setUTCDate(date.getUTCDate() + Number(shouldAddDay));
        date.setUTCHours(14, 30, 0, 0)
    } else {
        date.setUTCMinutes(date.getUTCMinutes() + 1);
    }

    return date;
}

export const chartFormatDates = (chart, range) => {
    switch (range) {
        case '5d': {
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            const d =  new Date(chart[0].date);
            const returnedchart = chart.map(item => {
                const { date } = item;
                let d = new Date(date);
                d = days[d.getUTCDay() - 1]
                return ({ ...item, label: d })
            })
            return returnedchart;
        }
        case '1m': {
            const returnedChart = chart.map(item => {
                const { date } = item;
                let d = new Date(date);
                d = d.getUTCDate();
                return ({ ...item, label: d });
            })
            return returnedChart
        }
        case '1y': {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const returnedChart = chart.map(item => {
                const { date } = item;
                let d = new Date(date);
                //d = d.getUTCDate();
                d = months[d.getUTCMonth()]
                return ({ ...item, label: d });
            })
            return returnedChart
        }
        case '5y': {
            const returnedChart = chart.map(item => {
                const { date } = item;
                let d = new Date(date);
                d = d.getUTCFullYear();
                return ({ ...item, label: d });
            })
            return returnedChart
        }
        default: {
            return chart;
        }
    }
}