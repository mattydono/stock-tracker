import React from 'react';
import styled from '@emotion/styled'
import { Title } from '../Root'
import { _CompanyOverview } from '../../models'

const CompanyOverviewContainer = styled.div`
    width: 100%;
    height: 70%;
    overflow: auto;
    font-size: 0.7rem;
    margin-bottom: 2%;
`

const Name = styled.div`
    font-size: 1rem;
    margin-top: 2%;
`

const Website = styled.div`
    font-size: 0.7rem;
    margin-top: 2%;
    margin-bottom: 2%;
`

const CompanyOverview: React.FC<_CompanyOverview> = ({ companyName, symbol, website, description }) => {
    return (
        <CompanyOverviewContainer>
            <Title>COMPANY OVERVIEW</Title>
            <Name>{companyName}{symbol}</Name>
            <Website><i>{website}</i></Website>
            <div>{description}</div>
        </CompanyOverviewContainer>
    );
}

export default CompanyOverview;