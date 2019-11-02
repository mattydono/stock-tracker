import React, { FC } from 'react'
import styled from '@emotion/styled'

const SubInput = styled.div`
    display: flex;
    flex-direction: row;
`

const Sub = styled.span`
    background-color: #415f8a;
    border-radius: 2px;
    height: 22px;
    font-size: 14px;
    margin-right: 11px;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    align-items: center;
    overflow: hidden;
`

type TagsProps = {
    primaryExchange: string | null,
    tags: string[], 
}

export const Tags: FC<TagsProps> = ({primaryExchange, tags}) => {
    return (
        <SubInput>
            <Sub>{primaryExchange}</Sub>
            <Sub>{tags[0]}</Sub>
            <Sub>{tags[1]}</Sub>
        </SubInput>
    )
}