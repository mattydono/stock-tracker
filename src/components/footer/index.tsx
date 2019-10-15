import React from 'react';
import { _PriceSingleDataPoint, _Favorites } from '../../models';

import TickerCard from '../search/tickerCard';

import styled from '@emotion/styled'

type FooterProps = {
    favorites: _Favorites,
}

const FooterContainer = styled.div`
    background-image: linear-gradient(to bottom, #0042a0, #001839);
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 40px;
    height: 100%;
    min-height: 40px;
    width: 100%;
`

const Markets = styled.div`
    width: 50%;
    background-color: red;
`

const Favourites = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
`

const Ticker = styled.div`
    font-size: 20px;
    margin-right: 25px;
`

const Card = styled.span`
    display: flex;
    align-items: center;
    flex: 0 0 1;
    margin-left: 2rem;
`

const FooterTickerCard: React.FC<_PriceSingleDataPoint> = ({ ticker, latestPrice, change, changePercent }) => {

    return (
        <Card>
            <Ticker>{ticker ? ticker.toUpperCase() : null}</Ticker>
            <TickerCard latestPrice={latestPrice} change={change} changePercent={changePercent} />
        </Card>
    )
}

const Footer: React.FC<FooterProps> = ({ favorites: { prices } }) => {
    const favoritesArray = prices[0] && prices.map(item => <FooterTickerCard {...item}/>)
    return (
        <FooterContainer>
            <Markets>hello</Markets>
            <Favourites>
                {favoritesArray}
            </Favourites>
        </FooterContainer>
    )
}

export default Footer;