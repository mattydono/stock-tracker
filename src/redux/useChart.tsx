import React, { useEffect, useState} from 'react';
import { createURL, fetchData, getExpirationDate } from './helpers';


import { _ChartSingleDataPoint, Range } from '../models';

type ChartState = { [key in Range]: {
    data: _ChartSingleDataPoint[] | [],
    error: string | null,
    isFetching: boolean,
    expirationTime: Date | null,
} | null }

type useChartProps = {
    range: Range,
    ticker: string,
    open: boolean,
    updateChartPrices: (prices: _ChartSingleDataPoint[]) => void,
}

const initialState: ChartState = {
    '1d': {
        data: [],
        error: null,
        isFetching: false,
        expirationTime: null,
    },
    '5d': {
        data: [],
        error: null,
        isFetching: false,
        expirationTime: null,
    },
    '1m': {
        data: [],
        error: null,
        isFetching: false,
        expirationTime: null,
    },
    '1y': {
        data: [],
        error: null,
        isFetching: false,
        expirationTime: null,
    },
    '5y': {
        data: [],
        error: null,
        isFetching: false,
        expirationTime: null,
    },
}



const useChart: React.FC<useChartProps> = ({ range, ticker, open, updateChartPrices }): any =>  {

    const [chart, setChart] = useState<ChartState>(initialState);
    const [chartRange, setChartRange] = useState<Range>(range);
    const [chartTicker, setChartTicker] = useState<string>(ticker);
    const [isUSMarketOpen, setIsUSMarketOpen] = useState<boolean>(open);
    const [flag, setFlag] = useState<boolean>(true);


    const renderChartCallback = (chart: _ChartSingleDataPoint[]) => {
        setChart(state => {
            return ({
                ...state,
                [chartRange]: ({ ...state[chartRange], data: chart, expirationTime: getExpirationDate(chartRange) })
            })
        })
        if(flag) updateChartPrices(chart)
    }

    const doChartFetch = () => fetchData(
        createURL(chartTicker, 'chart', chartRange),
        renderChartCallback,
        (e: string) => setChart(state => {
            return ({
                ...state,
                [chartRange]: ({ ...state[chartRange], error: e })
            })
        }),
        (bool: boolean) => setChart(state => {
            return ({
                ...state,
                [chartRange]: ({ ...state[chartRange], isFetching: bool })
            })
        }),
    );

    const renderChart = () => {
        const chartData = chart[chartRange];
        if (chartData && chartData.data[0] && chartData.data[0].symbol === chartTicker && chartData.expirationTime && chartData.expirationTime.getTime() > Date.now()) {
            updateChartPrices(chartData.data);
        } else {
            doChartFetch()
        }
    }

    useEffect(() => {
        setFlag(true);
        renderChart();

        const chartPoll = (isUSMarketOpen && chartRange === '1d') ? window.setInterval(doChartFetch, 60000) : false;

        return () => {
            setFlag(false);
            if(chartPoll) clearInterval(chartPoll)
        }

    }, [chartTicker, chartRange]);

    return [chart, setChartRange, setChartTicker, setIsUSMarketOpen, setFlag];

}

export default useChart;