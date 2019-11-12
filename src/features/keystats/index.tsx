import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled'
import { KeyStats } from './models';
import { AppState } from '../../models';
import { Title } from '../../Root'
import { StatsTable } from './components'
import { Loader } from '../loader'

const KeyStatsLayoutContainer = styled.div`
    flex: 0 1 63%;
`


export const KeyStatsComponent: FC = () => {

    const { ...keystatsProps }: KeyStats = useSelector((state: AppState) => state.keyStats)

    const nullValues = Object.values(keystatsProps).every((item: number) => !item);
    
    return (    
        <KeyStatsLayoutContainer>
            <Title>KEY STATS</Title>
            {
                !nullValues 
                ? <StatsTable {...keystatsProps} />
                : <Loader className='flex-direction: column; margin-top: 100px; @media(max-width: 750px) {margin-top: 50px; margin-bottom: 50px}' size={50} seperation={2} speed={1.4} /> 
            } 
        </KeyStatsLayoutContainer>
    )
}
