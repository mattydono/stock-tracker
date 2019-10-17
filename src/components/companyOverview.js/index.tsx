import React from 'react';
import { _CompanyOverview } from '../../models'
import loading from '../../gif/loading.gif'
import styled from '@emotion/styled'
import { Title } from '../Root'
import FetchingError from '../errors/errorFetching'

const CompanyOverviewContainer = styled.div`
    max-height: 400px;
    height: 75%;
    margin-bottom: 20px;
    @media(max-width: 750px) {
        margin-top: 40px;
        margin-bottom: 20px;
    }
`

const Name = styled.div`
    margin-top: 5px;
    font-size: 2rem;
`

const Website = styled.div`
    margin-top: 25px;
    margin-bottom: 25px;
`

const Link = styled.a`
    color: white;
    text-decoration: none;
    &:hover {
        color: #e0be86;
    };
    &:visited {
        color: #608fd1;
    }
`

const Description = styled.div`
    font-size: 1.2rem;
    max-height: 140px;
`

const CompanyLoading = styled.img`
    background-color: rgba(89, 89, 105, 0.2);
    border-radius: 5%;
`

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const OverflowContainer = styled.div`
    overflow: auto;
    max-height: 200px;
`

type ErrorLoading = {
    errorCompany: any,
    isFetchingCompany: boolean,
}

const Company: React.FC<_CompanyOverview> = ({ companyName, symbol, website, description }) => {
    return (
        <>
            <Name>{companyName} ({symbol})</Name>
            <Website>
                {website ?
                <Link href={website}><i>{website}</i></Link>
                :
                <span><i>{website}</i></span>
            }
            </Website>
            <OverflowContainer>
                <Description>{description}</Description>
            </OverflowContainer>
        </>
    )
}

const CompanyOverview: React.FC<_CompanyOverview & ErrorLoading> = ({ errorCompany, isFetchingCompany, ...companyProps }) => {

    const CompanyError = <FetchingError message={errorCompany.message}/>

    const Loading = <LoadingContainer><CompanyLoading src={loading} /></LoadingContainer>

    return (
        <CompanyOverviewContainer>
            <Title>COMPANY OVERVIEW</Title>
            {
                errorCompany && !isFetchingCompany ? CompanyError 
                : isFetchingCompany ? Loading 
                : <Company {...companyProps} />
            }
        </CompanyOverviewContainer>
    );
}

export default CompanyOverview;