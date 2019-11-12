import React, { memo } from 'react';
import styled from '@emotion/styled'
import { getColour, getChangeArrowDirection } from 'utils'

const PriceStats = styled.div`
    font-size: inherit;
    display: flex;
    flex: 0 0 300px;
    font-weight: 300;
    @media(max-width: 1000px) {
        max-height: 60px;
        justify-content: center;
    };
    @media(max-width: 650px) {
        margin-top: 10px;
    };
    @media(max-width: 588px) {
        font-size: 30px;
    };
`

type SpanProps = {
    color: string
}

const ChangeItem = styled.span<SpanProps>`
    display: flex;
    color: ${(props: SpanProps) => props.color};
    margin-left: 5px;
    margin-right: 5px;
`

const PriceIcon = styled.span`
    font-size: 20px;
    height: 20px;
    width: 120x;
    align-self: flex-start;
    margin-top: 4px;
    object-fit: contain;
`

const PriceSpan = styled.span`
    display: flex;
    flex: 0 0 1;
    margin-right: 13px;
`

const DollarIcon = styled.div`
    font-size: 20px;
    height: 24px;
    width: 12px;
    font-weight: 400;
    margin-top: 6px;
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

export const TickerCard = memo<TickerCardPropTypes>(({ latestPrice, change, changePercent, error }) => {

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
                    : <ChangeItem color={getColour(change)}>
                            <PriceIcon>{getChangeArrowDirection(change)}</PriceIcon>
                            {Math.abs(change).toFixed(2)}
                      </ChangeItem> 
                } 
                {
                    !change ? null 
                    : <ChangeItem color={getColour(change)}>|</ChangeItem> 
                }
                {
                    !changePercent ? null 
                    : <ChangeItem color={getColour(changePercent)}>
                        {Math.abs(Math.round((changePercent * 100) * 100) / 100).toFixed(2)}
                        <PriceIcon>%</PriceIcon>
                      </ChangeItem> 
                }
            </ChangeContainer>
        </PriceStats>
    )
})
