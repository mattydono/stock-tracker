import React, { useEffect, useState } from 'react';
import './index.css'
import loading from '../../gif/loading.gif'
import useChart from '../../redux/useChart';

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
    fetching: boolean;
}

type ChartProps = {
    prices: _ChartSingleDataPoint[],
    range: Range,
    updateChartRange: (range: Range) => void,
    updateChartPrices: (chartRange: _ChartSingleDataPoint[]) => void,
    open: boolean,
    ticker: string,
    latest?: number
}

const RangeButton: React.FC<RangeButtonProps> = ({ range, update, current, fetching }) => {
    const opacity = current ? 1.0 : 0.5;
    return (
        <div className='Label'>
            <input className='Input' 
                type="radio" 
                name="chart" 
                defaultChecked={current}
            />
            <span onClick={fetching ? () => {} : () => update(range)} style={{opacity}}>{range}</span>
        </div>
    )
}


const Chart: React.FC<ChartProps> = ({ prices, ticker, open, latest, range, updateChartRange, updateChartPrices }) => {
    const [chart, setFlag]: any = useChart({ range, ticker, open, updateChartPrices });

    const fetching = chart[range] && chart[range].isFetching
    const fetchingAndStateEmpty = fetching && (prices.length == 0 || prices[0].symbol !== ticker);


    const ranges: Range[] = ['5y', '1y', '1m', '5d', '1d'];
    const buttons = ranges.map(rangeItem => <RangeButton fetching={fetching} current={rangeItem === range} range={rangeItem} update={updateChartRange} />)

    const now: _ChartSingleDataPoint = {
        label: 'latest',
        close: latest,
    }

    const testing = false;

    const data = open || testing ? prices.concat(now) : prices;


    //TODO: Add loading spinner. Add error message if error (conditional rendering based on isFetching & isError)
    return (
      <div className={fetchingAndStateEmpty ? 'ChartLoadingContainer' : 'ChartContainer'}>
          {fetchingAndStateEmpty ? <img className='ChartLoading' src={loading} /> :
            <>
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
                {fetching ? <p>fetching data...</p> : <p>&nbsp;</p>}
            </>
          }
      </div>
    );
}


export default Chart;