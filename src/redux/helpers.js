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

export const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const chartFormatDates = (chart, range) => {
    switch (range) {
        case '5d': {
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
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
                let d = new Date(date).getUTCDate();
                return ({ ...item, label: d });
            })
            return returnedChart
        }
        case '1y': {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const returnedChart = chart.map(item => {
                const { date } = item;
                let d = new Date(date);
                d = months[d.getUTCMonth()]
                return ({ ...item, label: d });
            })
            return returnedChart
        }
        case '5y': {
            const returnedChart = chart.map(item => {
                const { date } = item;
                let d = new Date(date).getUTCFullYear();
                return ({ ...item, label: d });
            })
            return returnedChart
        }
        default: {
            return chart;
        }
    }
}