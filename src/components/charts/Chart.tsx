import React, { useEffect, memo } from 'react';
import styled from '@emotion/styled';
import AdaptiveLoader from '../loader/Loader';
import { socketService } from '../../services/socket_service'
import { chartFormatDates } from './chart_formatter';

import { 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    ReferenceLine,
    Label,
} from 'recharts';
import { _ChartSingleDataPoint, Range } from './models';

const ChartContainer = styled.div`    
    flex: 0 1 66%;
    margin-top: 15px;
    margin-left: -35px;
    font-size: 10px;
    font-weight: 300;
    max-width: 890px;
    @media(max-width: 750px) {
        margin-top: 40px;
        margin-right: -30px;
        margin-bottom: -10px;
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-right: 60px;
    font-family: 300;
    font-size: 12px;
    color: #beccdc;
`

const LabelRange = styled.div`
    margin: 0rem 0rem 1rem 0.5rem;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    font-weight: 100;
    text-transform: uppercase;
    cursor: pointer;
`

const Input = styled.input`
    display: none;
`

const ChartLoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 250px;
    @media(max-width: 750px) {
        margin-top: 10px;
        margin-bottom: 50px;
    }
`

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
    open: boolean,
    ticker: string,
    latest: number,
}

const RangeButton: React.FC<RangeButtonProps> = ({ range, update, current }) => {
    const opacity = current ? 1.0 : 0.5;
    return (
        <LabelRange>
            <Input 
                type="radio" 
                name="chart" 
                defaultChecked={current}
            />
            <span onClick={() => update(range)} style={{opacity}}>{range}</span>
        </LabelRange>
    )
}

const ranges: Range[] = ['MAX', '5y', '1y', '1m', '5d', '1d'];

export const Chart: React.FC<ChartProps> = ({ prices, ticker, open, latest, range, updateChartRange, updateChartPrices }) => {

    const renderChart = (chart: _ChartSingleDataPoint[]) => {
        const formattedChart = chartFormatDates(chart, range);
        updateChartPrices(formattedChart);
    }

    useEffect(() => {
        const socket = socketService.get();

        socket.emit('chart', [ticker, range]);
        socket.on('chart', renderChart);
        return () => {
            socket.emit('unsubscribeChart', [ticker, range])
        }
    }, [ticker, range])

    const buttons = ranges.map(rangeItem => <RangeButton key={rangeItem} current={rangeItem === range} range={rangeItem} update={updateChartRange} />);
    const fetchingAndStateEmpty = prices.length === 0;

    const interval = range === '5d' ? 39 : range === '1m' ? 12 : range === '1d' ? 59 : range === '1y' ? 23 : 253;

    return (     
            <ChartContainer>
                    {!fetchingAndStateEmpty ?
                    <>
                        <ButtonsContainer>
                            {buttons}
                        </ButtonsContainer>
                        <ResponsiveContainer aspect={0.1} width='99%' maxHeight={425}>
                            <AreaChart data={prices} margin={{ left: 35 }} >
                                <defs>
                                    <linearGradient id='area' x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="30%" stopColor="#2d5083" stopOpacity={0.5}/>
                                        <stop offset="95%" stopColor="#2d5083" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke='#1d4168' strokeWidth={0.8} />
                                <XAxis tick={{fill: 'white'}} axisLine={false} interval={interval} dataKey="label" type="category" allowDataOverflow={false} />
                                <YAxis tick={{fill: 'white'}} axisLine={false} orientation="right" domain={['dataMin', 'auto']} tickLine={false} tickFormatter={item => item.toFixed(2)} />
                                <ReferenceLine y={latest} stroke={'#e95656'} strokeDasharray="3 3" label={
                                    <Label value={latest && latest.toFixed(2)} position="right" fill="#e95656" /> } 
                                />
                                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                                <Area connectNulls type="monotone" dataKey="close" name="price" unit=" USD" fill='url(#area)' fillOpacity={1} stroke="#608fd1" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </>
                    :
                    <ChartLoadingContainer>
                        <AdaptiveLoader size={50} seperation={2} speed={1.4} />
                    </ChartLoadingContainer>   
                    }                         
            </ChartContainer>
    );
}


export default memo(Chart);