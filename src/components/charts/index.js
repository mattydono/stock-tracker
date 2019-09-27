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

const RangeButton = ({ range, update, current }) => {
    const color = current ? 'red' : 'black';
    return <Button style={{color}} onClick={() => update(range)} >{range}</Button>
}


const Chart = ({ prices: data, range, updateChartRange }) => {

    const ranges = ['1d', '5d', '1m', '1y', '5y'];

    const buttons = ranges.map(rangeItem => <RangeButton current={rangeItem === range} range={rangeItem} update={updateChartRange} />)

    return (
    <div>
        {buttons}
      <ResponsiveContainer width="100%" aspect={0.9} minWidth={360} maxHeight={800}>
        <AreaChart data={data} margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date"/>
          <YAxis orientation="right" domain={['dataMin', 'auto']}/>
          <Tooltip />
          <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    );
}


export default Chart;