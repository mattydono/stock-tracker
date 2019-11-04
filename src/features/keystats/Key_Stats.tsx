import React, { memo } from 'react';
import { _KeyStats } from './models/keyStats'
import styled from '@emotion/styled'
import { Title } from '../Root'
import { StatsTable } from './components/table'
import { Loader } from '../loader/Loader'

const KeyStatsLayoutContainer = styled.div`
    flex: 0 1 63%;
`

type Error = {
    errorQuote: {
        message: string
    }
}

const KeyStats: React.FC<_KeyStats & Error> = ({
    isFetchingQuote,
    errorQuote,
    ...keystatsProps
    }) => {

    const nullValues = Object.values(keystatsProps).every((item: number) => !item);
    
    return (    
        <KeyStatsLayoutContainer>
            <Title>KEY STATS</Title>
            {
                !nullValues 
                ? <StatsTable {...keystatsProps} isFetchingQuote={isFetchingQuote} />
                : <Loader className='flex-direction: column; margin-top: 100px; @media(max-width: 750px) {margin-top: 50px; margin-bottom: 50px}' size={50} seperation={2} speed={1.4} /> 
            } 
        </KeyStatsLayoutContainer>
    )
}

export default memo(KeyStats);