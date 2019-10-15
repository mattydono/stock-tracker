import React from 'react';
import { _CompanyOverview } from '../../models'
import loading from '../../gif/loading.gif'
import styled from '@emotion/styled'
import { Title } from '../Root'

const CompanyOverviewContainer = styled.div`
    max-height: 400px;
    height: 75%;
    margin-bottom: 20px;
    @media(max-width: 800px) {
        margin-bottom: 30px;
    }
`

const CompanyLoadingContainer = styled.div`
    max-height: 400px;
    height: 75%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Name = styled.div`
    margin-top: 2%;
    font-size: 2rem;
`

const Website = styled.div`
    margin-top: 2%;
    margin-bottom: 2%;
`

const Link = styled.a`
    color: white;
    text-decoration: none;
    &:hover {
        color: yellow;
    };
    &:visited {
        color: #608fd1;
    }
`

const Description = styled.div`
    font-size: 1.2rem;
`

const CompanyLoading = styled.img`
    background-color: rgba(89, 89, 105, 0.2);
    border-radius: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 30%;
    padding-right: 30%;
`

const OverflowContainer = styled.div`
    overflow: auto;
    max-height: 200px;
`
const CompanyOverview: React.FC<_CompanyOverview> = ({ errorCompany, isFetchingCompany, companyName, symbol, website, description }) => {

    console.log(errorCompany)

    return (
            <>
            {companyName && symbol && website && description ?
                <CompanyOverviewContainer>
                    <Title>COMPANY OVERVIEW</Title>
                    <Name>{companyName}{symbol}</Name>
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
                </CompanyOverviewContainer>
                :
                <CompanyLoadingContainer>
                    <Title>COMPANY OVERVIEW</Title>
                    <CompanyLoading src={loading} />
                </CompanyLoadingContainer>
            }
            </>

    );
}

export default CompanyOverview;