import React from 'react';
import styled from '@emotion/styled'

const PriceStats = styled.div`
    font-size: 30px;
    display: flex;
    flex: 0 0 300px;
    @media(max-width: 800px) {
        max-height: 60px;
        justify-content: center;
    }
`

const Span = styled.span`
    display: flex;
    font-size: 30px;
    color: red;
    color: ${props => props.color}
    margin-left: 10px;
    margin-right: 10px;
`

const PriceIcon = styled.span`
    font-size: 15px;
    align-self: flex-start;
    margin-top: 3px;
`

const PriceSpan = styled.span`
    display: flex;
    flex: 0 0 1;
    margin-right: 5px;
`

const DollarIcon = styled.span`
    font-size: 15px;
    margin-top: 3%;
    margin-right: 2px;
`

type TickerCardPropTypes = {
    latestPrice: number | undefined,
    change: number | null,
    changePercent: number | null,
    booleanBig?: boolean,
}

const TickerCard: React.FC<TickerCardPropTypes> = ({ latestPrice, change, changePercent, booleanBig }) => {
    return (
        <PriceStats>
            {
                latestPrice ? 
                    <PriceSpan>
                        <DollarIcon>$</DollarIcon>
                        {latestPrice}
                    </PriceSpan> 
                : null
            }
            {
                !change ? null 
                : change > 0 ? 
                    <Span color='green'>
                        <PriceIcon>&#8593;</PriceIcon>
                        {Math.abs(change)}
                    </Span> 
                : <span className='Span'><span className='PriceIcon'>&#8595;</span>{Math.abs(change)}</span>
            } 
            {
                !change ? null 
                : change > 0 ? 
                    <span className='Span positive'>|</span> 
                : 
                    <span className='Span'>|</span> 
            }
            {
                !changePercent ? null 
                : changePercent > 0 ? 
                    <span className='Span positive'>
                        {Math.abs(Math.round((changePercent * 100) * 100) / 100)}
                        <span className='PriceIcon'>&#37;</span>
                    </span> 
                : 
                    <span className='Span'>
                        {Math.abs(Math.round((changePercent * 100) * 100) / 100)}
                        <span className='PriceIcon'>&#37;</span>
                    </span>
            }
        </PriceStats>
    )
}

export default TickerCard;