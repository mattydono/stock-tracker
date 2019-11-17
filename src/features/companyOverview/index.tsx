import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled'
import { AppState } from '../../models';
import { Title } from '../../Root'
import { Loader } from '../loader'

const CompanyOverviewContainer = styled.div`
    max-height: 400px;
    margin-bottom: 25px;
    @media(max-width: 750px) {
        margin-top: 40px;
        margin-bottom: 20px;
    }
`

const Name = styled.div`
    margin-top: 10px;
    font-size: 24px;
`

const Website = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
`

const Link = styled.a`
    text-decoration: none;
    font-size: 14px;
    color: #beccdc;
    &:hover {
        color: #e0be86;
    };
    &:visited {
        color: #608fd1;
    }
`

const Description = styled.div`
    font-size: 16px;
    max-height: 140px;
    overflow: auto;
    max-height: 100px;
`

export const CompanyOverviewComponent: FC<{}> = () => {

    const { symbol, companyName, website, description } = useSelector((store: AppState) => store.companyOverview)

    return (
        <CompanyOverviewContainer>
            <Title>COMPANY OVERVIEW</Title>
            {
                !symbol
                ? <Loader className='margin-top: 50px; margin-bottom: 50px;' size={50} seperation={2} speed={1.4} />
                : <>
                    <Name>{companyName} ({symbol})</Name>
                    <Website>
                        {website ?
                        <Link href={website}><i>{website}</i></Link>
                        :
                        <span><i>{website}</i></span>
                    }
                    </Website>
                    <Description>{description}</Description>
                 </>
            }
        </CompanyOverviewContainer>
    );
}
