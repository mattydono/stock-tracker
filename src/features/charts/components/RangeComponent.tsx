import React, { memo } from 'react'
import styled from '@emotion/styled'
import { Range } from '../models'
import { RangeButton } from './RangeButton'
 
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-right: 60px;
    font-family: 300;
    font-size: 12px;
    color: #beccdc;
`

const ranges: Range[] = ['MAX', '5y', '1y', '1m', '5d', '1d'];

type RangeComponentProps = {
    range: Range,
    update: (range: Range) => void
}

export const RangeComponent = memo<RangeComponentProps>(({ range, update }) => {

    const buttons = ranges.map(rangeItem => <RangeButton key={rangeItem} current={rangeItem === range} range={rangeItem} update={update} />);

    return (
        <ButtonsContainer>
            {buttons}
        </ButtonsContainer>
    )
})
