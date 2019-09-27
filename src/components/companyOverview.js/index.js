import React from 'react';
import styled from '@emotion/styled'
import { Title } from '../Root'

const CompanyOverviewContainer = styled.div`
    width: 100%;
    height: 75%;
    overflow: auto;
`

const CompanyOverview = ({ companyName, symbol, website, description }) => {
    return (
        <CompanyOverviewContainer>
            <Title>COMPANY OVERVIEW</Title>
            <div>{companyName}{symbol}</div>
            <div>{website}</div>
            <div>{description}</div>
        </CompanyOverviewContainer>
    );
}

export default CompanyOverview;