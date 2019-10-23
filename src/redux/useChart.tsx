import React, { useEffect, useState} from 'react';
import { createURL, fetchData, getExpirationDate, chartFormatDates } from './helpers';
import { _ChartSingleDataPoint, Range } from '../models';
import io from 'socket.io-client';


type ChartState = { 
    [key in Range]: {
    ticker: string | null,
    data: _ChartSingleDataPoint[] | [],
    error: string | boolean,
    isFetching: boolean,
    expirationTime: Date | null,
} | null}

type useChartProps = {
    range: Range,
    ticker: string,
    open: boolean,
    updateChartPrices: (prices: _ChartSingleDataPoint[]) => void,
}

const initialState: ChartState = {
    '1d': {
        ticker: null,
        data: [],
        error: false,
        isFetching: false,
        expirationTime: null,
    },
    '5d': {
        ticker: null,
        data: [],
        error: false,
        isFetching: false,
        expirationTime: null,
    },
    '1m': {
        ticker: null,
        data: [],
        error: false,
        isFetching: false,
        expirationTime: null,
    },
    '1y': {
        ticker: null,
        data: [],
        error: false,
        isFetching: false,
        expirationTime: null,
    },
    '5y': {
        ticker: null,
        data: [],
        error: false,
        isFetching: false,
        expirationTime: null,
    },
}

const socket = io('http://localhost:4000');


const useChart: React.FC<useChartProps> = ({ range, ticker, open, updateChartPrices }): any =>  {

    const [chart, setChart] = useState<ChartState>(initialState);
    let shouldChartUpdate = true;


    const renderChartCallback = (chart: _ChartSingleDataPoint[]) => {
        chart = chartFormatDates(chart, range)
        setChart(state => {
            return ({
                ...state,
                [range]: ({ ...state[range], data: chart, ticker: chart[0].symbol, expirationTime: getExpirationDate(range) })
            })
        })
        if(shouldChartUpdate) updateChartPrices(chart)
    }

    const renderChart = (ticker: string, range: Range) => {
        const chartData = chart[range];
        if (chartData && chartData.data[0] && chartData.data[0].symbol === ticker && chartData.expirationTime && chartData.expirationTime.getTime() > Date.now()) {
            updateChartPrices(chartData.data);
        } else {
            socket.emit('chart', [ticker, range]);
        }
    }

    useEffect(() => {
        renderChart(ticker, range);
        socket.on('chart', (result: _ChartSingleDataPoint[]) => {
            renderChartCallback(result);
        })

        return () => {
            shouldChartUpdate = false;
        }

    }, [ticker, range]);

    return [chart];

}

export default useChart;