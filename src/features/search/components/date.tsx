import React, { FC } from 'react'
import styled from '@emotion/styled'
import moment from 'moment'

const DateLayoutContainer = styled.div`
    font-size: 14px;
    display: flex;
    font-weight: 300;
    justify-content: flex-end;
    margin-left: 5px;
`

const Time = styled.span`
    color: rgba(255, 255, 255, 0.8);
    @media(max-width: 750px) {
        display: none;
    }
`

const MarketStatus = styled.span`
    font-size: 14px;
    font-weight: 400;
    display: flex;
    margin-left: 25px;
    position: relative;
`

const MarketIcon = styled.div(props => ({
    color: props.color ? 'yellow' : 'gray',
    fontSize: '15px',
    position: 'absolute',
    top: '-2px',
    left: '-15px',
}))

type DateProps = {
    latestTime: string | null,
    isUSMarketOpen: boolean | null,
    tags: string[],
}

const formatDate = (date: any) => new Date(date);
    const EST = formatDate(moment()).toLocaleString("en-US", {
        timeZone: "America/New_York"
      });
    const formattedEST = moment(EST).format("lll");

export const DateTime: FC<DateProps> = ({latestTime, isUSMarketOpen, tags}) => {
    return (
        <DateLayoutContainer>
            {latestTime ? <Time>Real-Time Price as of {formattedEST} EST</Time> : null}
            {tags.length < 1 ? null : isUSMarketOpen ? <MarketStatus><MarketIcon color='yellow'>☀</MarketIcon>Market Open</MarketStatus> : <MarketStatus><MarketIcon>☽</MarketIcon> Market Closed</MarketStatus>}
        </DateLayoutContainer>
    )
}