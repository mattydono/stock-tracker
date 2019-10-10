import React from 'react';

type TickerCardPropTypes = {
    latestPrice: number | undefined,
    change: number | null,
    changePercent: number | null,
    booleanBig?: boolean,
}

const TickerCard: React.FC<TickerCardPropTypes> = ({ latestPrice, change, changePercent, booleanBig }) => {
    return (
        <div className='PriceStats'>
            {
                latestPrice ? 
                    <span className='PriceSpan'>
                        <span className='DollarIcon'>$</span>
                        {latestPrice}
                    </span> 
                : null
            }
            {
                !change ? null 
                : change > 0 ? 
                    <span className='Span positive'>
                        <span className='PriceIcon'>&#8593;</span>
                        {Math.abs(change)}
                    </span> 
                : <span className='Span'><span className='PriceIcon'>&#8595;</span>{Math.abs(change)}</span>
            } 
            {
                !change ? null 
                : change > 0 ? 
                    <span className='Span positive'>|</span> 
                : 
                    <span className='Span'>|</span> 
            }
            {
                !changePercent ? null 
                : changePercent > 0 ? 
                    <span className='Span positive'>
                        {Math.abs(Math.round((changePercent * 100) * 100) / 100)}
                        <span className='PriceIcon'>&#37;</span>
                    </span> 
                : 
                    <span className='Span'>
                        {Math.abs(Math.round((changePercent * 100) * 100) / 100)}
                        <span className='PriceIcon'>&#37;</span>
                    </span>
            }
        </div>
    )
}

export default TickerCard;