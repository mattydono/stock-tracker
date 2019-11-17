import React, { memo } from 'react'
import styled from '@emotion/styled'
import { getColour, getChangeArrowDirection } from 'utils'

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

const PriceChange = styled.span<SpanProps>`
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

export const TickerPrice = memo<TickerCardPropTypes>(({ latestPrice, change, changePercent, error }) => {

    return (
        <PriceLayoutContainer>
            {
                latestPrice 
                ? <PriceContainer>
                    <DollarIcon>$</DollarIcon>
                    {latestPrice.toFixed(2)}
                  </PriceContainer> 
                : null
            }
            <ChangeLayoutContainer>
                {
                    !change ? null 
                    : <PriceChange color={getColour(change)}>
                        <PriceIcon>{getChangeArrowDirection(change)}</PriceIcon>
                        {Math.abs(change).toFixed(2)}
                      </PriceChange>
                } 
                {
                    !change ? null 
                    : <PriceChange color={getColour(change)}>|</PriceChange> 
                }
                {
                    !changePercent ? null 
                    : <PriceChange color={getColour(changePercent)}>
                        {Math.abs(Math.round((changePercent * 100) * 100) / 100).toFixed(2)}
                        <PriceIcon>%</PriceIcon>
                      </PriceChange>
                }
            </ChangeLayoutContainer>
        </PriceLayoutContainer>
    )
})
