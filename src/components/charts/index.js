import React from 'react';
import styled from '@emotion/styled';

import { 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';

const Button = styled.button`
    width: 20px;
    height: 20px;
`

const ChartContainter = styled.div`
    width: 75%;
    height: 40vh;
`

const RangeButton = ({ range, update, current }) => {
    const color = current ? 'red' : 'black';
    return <Button style={{color}} onClick={() => update(range)} >{range}</Button>
}


const Chart = ({ prices: data, range, updateChartRange }) => {

    const ranges = ['1d', '5d', '1m', '1y', '5y'];

    const buttons = ranges.map(rangeItem => <RangeButton current={rangeItem === range} range={rangeItem} update={updateChartRange} />)

    return (
      <ChartContainter>
          <ResponsiveContainer aspect={0.9} minWidth={360} maxHeight={500}>
                <AreaChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"/>
                    <YAxis orientation="right" domain={['dataMin', 'auto']}/>
                    <Tooltip />
                    <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                </AreaChart>
            </ResponsiveContainer>
      </ChartContainter>
    );
}


export default Chart;