import React, { memo } from 'react';
import { _PriceSingleDataPoint } from '../../models/prices';
import USMarketsMockData from './USMarketsMockData.json';

import FooterTickerCard from './components/footerTickerCard';

import styled from '@emotion/styled'

const FooterContainer = styled.div`
    position: fixed;
    bottom: 0;
    align-self: flex-end;
    background-image: linear-gradient(to bottom, #00265d, #00204f);
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 40px;
    height: 60px;
    width: 100%;
    @media(max-width: 588px) {
        display: none;
    };
`

const FavouritesContainer = styled.div`
    width: 50%;
    overflow: hidden;
    @media(max-width: 1390px) {
        display: none;
    }
`

const MarketsContainer = styled.div`
    width: 50%;
    overflow: hidden;
    @media(max-width: 1390px) {
        width: 100%;
    }
`

const Header = styled.div`
    width: 67px;
    height: 15px;
    margin-top: 9px;
    margin-bottom: 7px;
    font-family: Lato;
    margin-left: 19px;
    font-size: 12px;
    font-weight: 400;
`

const FooterSection = styled.div`
    margin-left: 19px;
    margin-top: 3px;
    margin-bottom: 12px;
    height: 17px;
    font-family: Lato;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    font-size: 14px;
`

const Seperator = styled.div`
    opacity: 0.1;
    border: solid 1px white;
    @media(max-width: 1390px) {
        display: none;
    }
`

type FooterProps = {
    prices: _PriceSingleDataPoint[],
    favorites: string[],
}

const Footer: React.FC<FooterProps> = ({ prices, favorites }) => {
    
    const favoritesArray = prices[0] && prices.filter(({ ticker }) => ticker && favorites.includes(ticker)).map(item => <FooterTickerCard key={item.ticker} {...item} /> );
    const usMarketsArray = USMarketsMockData.map(item => <FooterTickerCard key={item.ticker} {...item}/>)

    return (
        <FooterContainer>
            <MarketsContainer>
                <Header>US MARKET</Header>
                <FooterSection>
                    {usMarketsArray}
                </FooterSection>
            </MarketsContainer>
            <Seperator />
            <FavouritesContainer>
                <Header>FAVORITES</Header>
                <FooterSection>
                    {favoritesArray}
                </FooterSection>
            </FavouritesContainer>
        </FooterContainer>
    )
}

export default memo(Footer);