import React from 'react';
import styled from '@emotion/styled'

const PriceStats = styled.div`
    font-size: inherit;
    display: flex;
    flex: 0 0 300px;
    font-weight: 300;
    margin-bottom: 5px;
    @media(max-width: 1000px) {
        max-height: 60px;
        justify-content: center;
    };
    @media(max-width: 800px) {
        max-height: 60px;
        justify-content: center;
    };
    @media(max-width: 650px) {
        font-size: 40px;
        margin-top: 10px;
    };
    @media(max-width: 588px) {
        font-size: 30px;
    };
`

const Span = styled.span`
    display: flex;
    color: ${(props: any) => props.color ? '#91e4a5' : '#e95656'};
    margin-left: 5px;
    margin-right: 5px;
`

const PriceIcon = styled.span`
    font-size: 0.5em;
    align-self: flex-start;
    margin-top: 6px;
`

const PriceSpan = styled.span`
    display: flex;
    flex: 0 0 1;
    margin-right: 10px;
`

const DollarIcon = styled.div`
    font-size: 0.5em;
    font-weight: 400;
    margin-top: 6px;
    margin-right: 2px;
`

const ChangeContainer = styled.div`
    display: flex;
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
                        {latestPrice.toFixed(2)}
                    </PriceSpan> 
                : null
            }
            <ChangeContainer>
                {
                    !change ? null 
                    : change > 0 ? 
                        <Span color='green'>
                            <PriceIcon>&#129121;</PriceIcon>
                            {Math.abs(change).toFixed(2)}
                        </Span> 
                    : <Span><PriceIcon>&#129123;</PriceIcon>{Math.abs(change).toFixed(2)}</Span>
                } 
                {
                    !change ? null 
                    : change > 0 ? 
                        <Span color='green'>|</Span> 
                    : 
                        <Span>|</Span> 
                }
                {
                    !changePercent ? null 
                    : changePercent > 0 ? 
                        <Span color='green'>
                            {Math.abs(Math.round((changePercent * 100) * 100) / 100).toFixed(2)}
                            <PriceIcon>%</PriceIcon>
                        </Span> 
                    : 
                        <Span>
                            {Math.abs(Math.round((changePercent * 100) * 100) / 100).toFixed(2)}
                            <PriceIcon>%</PriceIcon>
                        </Span>
                }
            </ChangeContainer>
        </PriceStats>
    )
}

export default TickerCard;