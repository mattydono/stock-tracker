import React, { memo } from 'react';
import styled from '@emotion/styled';
import { Loader } from '../loader/Loader';
import { RangeButtons } from './components/range_buttons'
import { Graph } from './components/graph'
import { _ChartSingleDataPoint, Range } from './models';

const ChartLayoutContainer = styled.div`    
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

type ChartProps = {
    prices: _ChartSingleDataPoint[],
    range: Range,
    updateChartRange: (range: Range) => void,
    updateChartPrices: (chartRange: _ChartSingleDataPoint[]) => void,
    open: boolean,
    ticker: string,
    latest: number,
}

const Chart: React.FC<ChartProps> = ({ prices, ticker, latest, range, updateChartRange, updateChartPrices }) => {


    return (     
            <ChartLayoutContainer>
                {
                    prices.length !== 0 
                    ? <><RangeButtons range={range} update={updateChartRange}/><Graph prices={prices} range={range} latest={latest}/></>
                    : <Loader className='margin-top: 250px; @media(max-width: 750px) { margin-top: 10px; margin-bottom: 50px; }' size={50} seperation={2} speed={1.4} />
                }                         
            </ChartLayoutContainer>
    );
}

export default memo(Chart);