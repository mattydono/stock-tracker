import React from 'react';
import { _PriceSingleDataPoint, _Favorites } from '../../models';

type FooterProps = {
    favorites: _Favorites,
}

const Footer: React.FC<FooterProps> = ({ favorites: { prices } }) => {
    console.log(prices);
    return (
        <div></div>
    )
}

export default Footer;