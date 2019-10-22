import React from 'react';
import { _PriceSingleDataPoint, _Favorites } from '../../models';
import USMarketsMockData from './USMarketsMockData.json';

import TickerCard from '../search/tickerCard';

import styled from '@emotion/styled'
import { keyframes } from '@emotion/core';

type FooterProps = {
    prices: _PriceSingleDataPoint[],
    favorites: string[],
}

const footerAnimation = keyframes`
    0% {
        transform: translateX(0%);
        left: 100%;
    }
    100% {
        transform: translateX(-100%);
        left: 0;
    }
`

const FooterContainer = styled.div`
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

const Ticker = styled.div`
    margin-right: 25px;
    text-transform: uppercase;
    font-weight: 700;
`

const Card = styled.div`
    display: flex;
    flex: 0 0 1;
    margin-left: 2rem;
    font-size: 14px;
`

const FavouritesContainer = styled.div`
    width: 50%;
    overflow: hidden;
`

const Header = styled.div`
    margin-left: 2rem;
    margin-bottom: 0.5rem;
    font-size: 12px;
    font-weight: 400;
`

const Favourites = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    overflow: hidden;
    font-weight: 700;
    font-size: 14px;
    // animation: ${footerAnimation} 15s linear infinite;
`

const Markets = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    // position: fixed;
    overflow: hidden;
    font-weight: 700;
    font-size: 14px;
`



const FooterTickerCard: React.FC<_PriceSingleDataPoint> = ({ ticker, latestPrice, change, changePercent }) => {

    return (
        <Card>
            <Ticker>{ticker}</Ticker>
            <TickerCard latestPrice={latestPrice} change={change} changePercent={changePercent} />
        </Card>
    )
}

const Footer: React.FC<FooterProps> = ({ prices, favorites }) => {
    const favoritesArray = prices[0] && prices.filter(({ ticker }) => ticker && favorites.includes(ticker)).map(item => <FooterTickerCard {...item} /> );
    const usMarketsArray = USMarketsMockData.map(item => <FooterTickerCard {...item}/>)

    return (
        <FooterContainer>
            <FavouritesContainer>
                <Header>US MARKET</Header>
                <Markets>
                    {usMarketsArray}
                </Markets>
            </FavouritesContainer>
            <FavouritesContainer>
                <Header>FAVORITES</Header>
                <Favourites>
                    {favoritesArray}
                </Favourites>
            </FavouritesContainer>
        </FooterContainer>
    )
}

export default Footer;