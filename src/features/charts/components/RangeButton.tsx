import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Range } from '../models'
import { useDispatch } from 'react-redux'
import { updateChartRange } from '../redux/actions'

const LabelRange = styled.div`
    margin: 0rem 0rem 1rem 0.5rem;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    font-weight: 100;
    text-transform: uppercase;
    cursor: pointer;
`

const Input = styled.input`
    display: none;
`

type RangeButtonProps = {
    range: Range;
    current: boolean;
}

export const RangeButton: FC<RangeButtonProps> = ({ range, current }) => {

    const dispatch = useDispatch()

    const opacity = current ? 1.0 : 0.5;
    return (
        <LabelRange>
            <Input 
                type="radio" 
                name="chart" 
                defaultChecked={current}
            />
            <span onClick={() => dispatch(updateChartRange(range))} style={{opacity}}>{range}</span>
        </LabelRange>
    )
}