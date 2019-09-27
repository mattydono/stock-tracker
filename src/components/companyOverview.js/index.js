import React from 'react';
import styled from '@emotion/styled'

const CompanyOverviewContainer = styled.div`
    width: 100%;
    height: 15vh;
    overflow: auto
`

const CompanyOverview = ({ tags, companyName, symbol, website, description }) => {
    return (
        <CompanyOverviewContainer>
            <div>COMPANY OVERVIEW</div>
            <div>{companyName}{symbol}</div>
            <div>{website}</div>
            <div>{description}</div>
        </CompanyOverviewContainer>
    );
}

export default CompanyOverview;