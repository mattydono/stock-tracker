import React from 'react'
import styled from '@emotion/styled'

const PriceLayoutContainer = styled.div`
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

const PriceContainer = styled.span`
    display: flex;
    flex: 0 0 1;
    margin-right: 10px;
`

const DollarIcon = styled.div`
    font-size: 8px;
    font-weight: 400;
    margin-top: 1px;
`

const ChangeLayoutContainer = styled.div`
    display: flex;
`

type TickerCardPropTypes = {
    latestPrice: number | undefined,
    change: number | null,
    changePercent: number | null,
    error: boolean,
}

export const TickerPrice: React.FC<TickerCardPropTypes> = ({ latestPrice, change, changePercent, error }) => {

    return (
        <PriceLayoutContainer>
            {
                latestPrice ? 
                    <PriceContainer>
                        <DollarIcon>$</DollarIcon>
                        {latestPrice.toFixed(2)}
                    </PriceContainer> 
                : null
            }
            <ChangeLayoutContainer>
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
            </ChangeLayoutContainer>
        </PriceLayoutContainer>
    )
}