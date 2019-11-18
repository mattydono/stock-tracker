import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Loader } from '../loader';
import { Graph, RangeComponent } from'./components'
import { AppState } from 'models';
import { ErrorComponent } from 'features/error'

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

export const Chart = memo(() => {

    const prices = useSelector((store: AppState) => store.charts.prices);
    const range = useSelector((store: AppState) => store.charts.range);
    const latest = useSelector((store: AppState) => {
        const { latestPrice } = store.prices.find(({ ticker }) => ticker === store.search.ticker) || store.prices[0];
        return latestPrice;
    });
    const error = useSelector((store: AppState) => store.errors.chart)

    return (
            <ChartLayoutContainer>
                {
                    prices.length !== 0 
                    ? <><RangeComponent range={range} /><Graph prices={prices} range={range} latest={latest}/></>
                    : <Loader className='margin-top: 250px; @media(max-width: 750px) { margin-top: 10px; margin-bottom: 50px; }' size={50} seperation={2} speed={1.4} />
                }  
                {error && <ErrorComponent component='Chart' />}                      
            </ChartLayoutContainer>
    );
})
