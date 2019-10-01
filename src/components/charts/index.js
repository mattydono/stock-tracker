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


const ChartContainter = styled.div`
    width: 75%;
    height: 40vh;
`

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 20px;
    margin-right: 60px;
`

const Label = styled.label`
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


const RangeButton = ({ range, update, current }) => {
    const opacity = current ? 1.0 : 0.5;
    return (
        <Label>
            <Input 
                type="radio" 
                name="chart" 
                onClick={() => update(range)}
                defaultChecked={current}
            />
            <span style={{opacity}}>{range}</span>
        </Label>
    )
}




const Chart = ({ prices: data, range, updateChartRange }) => {

    const ranges = ['1d', '5d', '1m', '1y', '5y'];

    const buttons = ranges.map(rangeItem => <RangeButton current={rangeItem === range} range={rangeItem} update={updateChartRange} />).reverse();

    return (
      <ChartContainter>
          <ButtonsContainer>
              {buttons}
          </ButtonsContainer>
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