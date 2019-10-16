import React from 'react';
import { _PriceSingleDataPoint, _Favorites } from '../../models';
import USMarketsMockData from './USMarketsMockData.json';

import TickerCard from '../search/tickerCard';

import './index.css';

type FooterProps = {
    favorites: _PriceSingleDataPoint[],
}

const FooterTickerCard: React.FC<_PriceSingleDataPoint> = ({ ticker, latestPrice, change, changePercent }) => {

    return (
        <span className="Card">
            <div className="Ticker">{ticker}</div>
            <TickerCard latestPrice={latestPrice} change={change} changePercent={changePercent} />
        </span>
    )
}

const Footer: React.FC<FooterProps> = ({ favorites: prices }) => {
    const favoritesArray = prices[0] && prices.map(item => <FooterTickerCard {...item}/>);
    const usMarketsArray = USMarketsMockData.map(item => <FooterTickerCard {...item}/>)
    return (
        <div className="FooterHolder">
            <div className="FavoritesContainer">
                <div className="Header">US Markets</div>
                <div className="Favorites">
                    {usMarketsArray}
                </div>
            </div>
            <div className="FavoritesContainer" >
                <div className="Header">Favorites</div>
                <div className="Favorites">
                    {favoritesArray}
                </div>
            </div>
        </div>
    )
}

export default Footer;