import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled'
import { AppState } from '../../models';
import { Title } from '../../Root'
import { StatsTable } from './components'
import { Loader } from '../loader'
import { ErrorComponent } from 'features/error';

const KeyStatsLayoutContainer = styled.div`
    flex: 0 1 63%;
`

export const KeyStatsComponent: FC = () => {

    const { ...keystatsProps } = useSelector((state: AppState) => state.keyStats)
    const error = useSelector((state: AppState) => state.errors.quote)

    const nullValues = Object.values(keystatsProps).every((item: number) => !item);
    
    return (    
        <KeyStatsLayoutContainer>
            <Title>KEY STATS</Title>
            {
                !nullValues 
                ? <StatsTable {...keystatsProps} />
                : <Loader className='flex-direction: column; margin-top: 100px; @media(max-width: 750px) {margin-top: 50px; margin-bottom: 50px}' size={50} seperation={2} speed={1.4} /> 
            } 
            {error && <ErrorComponent component='Key Stats' />}
        </KeyStatsLayoutContainer>
    )
}
