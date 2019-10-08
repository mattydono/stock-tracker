import React from 'react';
import styled from '@emotion/styled'
import { Title } from '../Root'
import { _CompanyOverview } from '../../models'

const CompanyOverviewContainer = styled.div`
    width: 100%;
    height: 70%;
    margin-bottom: 2%;
    overflow: auto;
    @media(max-width: 800px) {margin-bottom: 40px;};
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

const Description = styled.div`
    font-size: 0.7rem;
`

const CompanyOverview: React.FC<_CompanyOverview> = ({ companyName, symbol, website, description }) => {
    return (
        <CompanyOverviewContainer>
            <Title>COMPANY OVERVIEW</Title>
            <Name>{companyName}{symbol}</Name>
            <Website><i>{website}</i></Website>
            <Description>{description}</Description>
        </CompanyOverviewContainer>
    );
}

export default CompanyOverview;