import React, { useEffect, useState } from 'react';
import './index.css'

import { 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    ReferenceLine,
} from 'recharts';
import { _ChartSingleDataPoint, Range } from '../../models';

type RangeButtonProps = {
    range: Range;
    update: (range: Range) => void;
    current: boolean;
}

type ChartProps = {
    prices: _ChartSingleDataPoint[],
    range: Range,
    updateChartRange: (range: Range) => void,
    updateChartPrices: (chartRange: _ChartSingleDataPoint[]) => void,
    open: boolean | null,
    ticker: string,
    latest?: number
}

const RangeButton: React.FC<RangeButtonProps> = ({ range, update, current }) => {
    const opacity = current ? 1.0 : 0.5;
    return (
        <div className='Label'>
            <input className='Input' 
                type="radio" 
                name="chart" 
                onClick={() => update(range)}
                defaultChecked={current}
            />
            <span style={{opacity}}>{range}</span>
        </div>
    )
}

type ChartState = { [key in Range]: _ChartSingleDataPoint[] | null}

const initialState: ChartState = {
    '1d': null,
    '5d': null,
    '1m': null,
    '1y': null,
    '5y': null,
}

const Chart: React.FC<ChartProps> = ({ prices, ticker, open, latest, range, updateChartRange, updateChartPrices }) => {

    const [chart, setChart] = useState<ChartState>(initialState);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false)

    const boolFlag = open && (range === '1d');

    const fetchChart = async () => {
        setIsFetching(true);
        try {
            const chart = await fetch(`/stock/${ticker}/chart/${range}`).then(res => res.json())
            setChart(state => {
                return ({
                    ...state,
                    [range]: chart,
                })
            })
            updateChartPrices(chart);
        } catch (error) {
            setIsError(true);
        }
        setIsFetching(false);
    }

    useEffect(() => {
        const chartData = chart[range];
        if (chartData && chartData[0] && chartData[0].symbol === ticker) {
            updateChartPrices(chartData);
        } else {
            fetchChart();
        }
    }, [range, ticker])

    useEffect(() => {
        if(boolFlag) {
            fetchChart();
            const polling = window.setInterval(
                () => {
                    fetchChart();
                },
                60000
            )
            return () => clearInterval(polling)
        }
    }, [ticker, boolFlag])

    const ranges: Range[] = ['5y', '1y', '1m', '5d', '1d'];
    const buttons = ranges.map(rangeItem => <RangeButton current={rangeItem === range} range={rangeItem} update={updateChartRange} />)

    const now: _ChartSingleDataPoint = {
        label: 'latest',
        close: latest,
    }

    const data = open ? prices.concat(now) : prices;

    //TODO: Add loading spinner. Add error message if error (conditional rendering based on isFetching & isError)
    return (
      <div className='ChartContainer'>
          <div className='ButtonsContainer'>
              {buttons}
          </div>
        <ResponsiveContainer aspect={0.9} width='99%' height='100%' maxHeight={500}>
            <AreaChart data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label"/>
                <YAxis orientation="right" domain={['dataMin', 'auto']} tickLine={false}/>
                <ReferenceLine y={now.close} stroke={'orange'} strokeDasharray="3 3" />
                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                <Area connectNulls type="monotone" dataKey="close" name="price" unit=" USD" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
        </ResponsiveContainer>
      </div>
    );
}


export default Chart;