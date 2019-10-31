import { _ChartSingleDataPoint } from './models/charts'
import { Range } from './models/range'

const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


export const chartFormatDates = (chart: _ChartSingleDataPoint[], range: Range) => {
    switch (range) {
        case '5d': {
            const returnedchart = chart.map(item => {
                const { date } = item;
                const d = new Date(date).getUTCDay();
                const c = Days[d - 1]
                return ({ ...item, label: c })
            })
            return returnedchart;
        }
        case '1m': {
            const returnedChart = chart.map(item => {
                const { date } = item;
                const d = new Date(date).getUTCDate()
                return ({ ...item, label: d });
            })
            return returnedChart
        }
        case '1y': {
            const returnedChart = chart.map(item => {
                const { date } = item;
                const d = new Date(date).getUTCMonth();
                return ({ ...item, label: Months[d] });
            })
            return returnedChart
        }
        case '5y': {
            const returnedChart = chart.map(item => {
                const { date } = item;
                const d = new Date(date).getUTCFullYear()
                return ({ ...item, label: d });
            })
            return returnedChart
        }
        default: {
            return chart;
        }
    }
}