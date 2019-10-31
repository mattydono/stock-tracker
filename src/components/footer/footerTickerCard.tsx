import React, { memo } from 'react';
import styled from '@emotion/styled'

const PriceStats = styled.div`
    font-size: inherit;
    display: flex;
    font-weight: normal;
    @media(max-width: 1000px) {
        max-height: 60px;
        justify-content: center;
    };
    @media(max-width: 800px) {
        max-height: 60px;
        justify-content: center;
    };
    @media(max-width: 588px) {
        font-size: 30px;
    };
`

type SpanProps = {
    color: string
}

const Span = styled.span<SpanProps>`
    display: flex;
    margin-right: 2px;
    color: ${(props: SpanProps) => props.color};
`

const PriceIcon = styled.span`
    font-size: 0.5em;
    align-self: flex-start;
    margin-top: 1px;
`

const PriceSpan = styled.span`
    display: flex;
    flex: 0 0 1;
    margin-right: 10px;
`

const DollarIcon = styled.div`
    font-size: 8px;
    font-weight: 400;
    margin-top: 1px;
`

const ChangeContainer = styled.div`
    display: flex;
`

type TickerCardPropTypes = {
    latestPrice: number | undefined,
    change: number | null,
    changePercent: number | null,
    error: boolean,
}

const TickerCard: React.FC<TickerCardPropTypes> = ({ latestPrice, change, changePercent, error }) => {

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
                        <Span color='#91e4a5'>
                            <PriceIcon>&#129121;</PriceIcon>
                            {Math.abs(change).toFixed(2)}
                        </Span> 
                    : <Span color='#e95656'><PriceIcon>&#129123;</PriceIcon>{Math.abs(change).toFixed(2)}</Span>
                } 
                {
                    !change ? null 
                    : change > 0 ? 
                        <Span color='#91e4a5'>|</Span> 
                    : 
                        <Span color='#e95656'>|</Span> 
                }
                {
                    !changePercent ? null 
                    : changePercent > 0 ? 
                        <Span color='#91e4a5'>
                            {Math.abs(Math.round((changePercent * 100) * 100) / 100).toFixed(2)}
                            <PriceIcon>%</PriceIcon>
                        </Span> 
                    : 
                        <Span color='#e95656'>
                            {Math.abs(Math.round((changePercent * 100) * 100) / 100).toFixed(2)}
                            <PriceIcon>%</PriceIcon>
                        </Span>
                }
            </ChangeContainer>
        </PriceStats>
    )
}

export default memo(TickerCard);