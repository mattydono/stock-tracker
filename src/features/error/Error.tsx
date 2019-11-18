import React, { memo } from 'react'
import styled from '@emotion/styled'

const Error = styled.div`
    color: #e95656;
    font-size: 12px;
`

type ErrorProps = {
    component: string
}

export const ErrorComponent = memo<ErrorProps>(({component}) => <Error>Fetching {component} Error</Error>)