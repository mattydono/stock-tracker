import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Loader } from '../loader/Loader';
import { RangeButtons } from './components/rangeButtons'
import { Graph } from './components/graph'
import { ChartSingleDataPoint, Range } from './models';
import { PriceSingleDataPoint } from '../../models/prices';
import { AppState } from '../../models/appState';

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
    prices: ChartSingleDataPoint[],
    range: Range,
    updateChartRange: (range: Range) => void,
    latest: number,
}

const Chart: React.FC<ChartProps> = ({ latest, updateChartRange }) => {

    const prices: ChartSingleDataPoint[] = useSelector((store: AppState) => store.charts.prices);
    const range: Range = useSelector((store: AppState) => store.charts.range);

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