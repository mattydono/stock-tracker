import React from 'react';
import { _PriceSingleDataPoint, _Favorites } from '../../models';

import TickerCard from '../search/tickerCard';

import './index.css';

type FooterProps = {
    favorites: _Favorites,
}

const FavoritesTickerCard: React.FC<_PriceSingleDataPoint> = ({ ticker, latestPrice, change, changePercent }) => {

    return (
        <div>
            {ticker}
            <TickerCard latestPrice={latestPrice} change={change} changePercent={changePercent} />
        </div>
    )
}

const Footer: React.FC<FooterProps> = ({ favorites: { prices } }) => {
    const favoritesArray = prices[0] && prices.map(item => <FavoritesTickerCard {...item}/>)
    return (
        <div className="FooterHolder">
            <div className="Markets">hello</div>
            <div className="Favorites">here</div>
            {/* {favoritesArray} */}
        </div>
    )
}

export default Footer;