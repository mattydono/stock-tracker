import React from 'react';
import { _PriceSingleDataPoint, _Favorites } from '../../models';

import TickerCard from '../search/tickerCard';

import './index.css';

type FooterProps = {
    favorites: _Favorites,
}

const FooterTickerCard: React.FC<_PriceSingleDataPoint> = ({ ticker, latestPrice, change, changePercent }) => {

    return (
        <span className="Card">
            <div className="Ticker">{ticker ? ticker.toUpperCase() : null}</div>
            <TickerCard latestPrice={latestPrice} change={change} changePercent={changePercent} />
        </span>
    )
}

const Footer: React.FC<FooterProps> = ({ favorites: { prices } }) => {
    const favoritesArray = prices[0] && prices.map(item => <FooterTickerCard {...item}/>)
    return (
        <div className="FooterHolder">
            <div className="Markets">hello</div>
            <div className="Favorites">
                {favoritesArray}
            </div>
        </div>
    )
}

export default Footer;