import React from 'react';
import { _KeyStats } from '../../models'
import './index.css'

const KeyStats: React.FC<_KeyStats> = ({
    marketCap, 
    peRatio, 
    week52High, 
    week52Low, 
    avgTotalVolume,
    previousClose,
    low,
    high,
    volume,
    open,
    dividendYield,
    actualEPS
    }) => {

    return (
        <div className='KeyStatsContainer'>
            <span className='Title'>KEY STATS</span>
            <div className='TableContainer'>
                <table className='Table'>
                    <tbody className='Tbody'>
                        <tr className='TR'>
                            <td className='TD'>Previous Close</td>
                            <td>{previousClose ? previousClose : null}</td>
                        </tr>
                        <tr className='TR'>
                            <td className='TD'>Day Range</td>
                            <td>{low ? low : null} - {high ? high : null}</td>
                        </tr>
                        <tr className='TR'>
                            <td className='TD'>Volume</td>
                            <td>{volume ? volume : null}</td>
                        </tr>
                        <tr className='TR'>
                            <td className='TD'>Market Cap</td>
                            <td>{marketCap ? marketCap : null}</td>
                        </tr>
                        <tr className='TR'>
                            <td className='TD'>P/E Ratio</td>
                            <td>{peRatio ? peRatio : null}</td>
                        </tr>
                    </tbody>
                </table>
                <table className='Table'>
                    <tbody className='Tbody'>
                        <tr className='TR'>
                            <td className='TD'>Open</td>
                            <td>{open ? open : null}</td>
                        </tr>
                        <tr className='TR'>
                            <td className='TD'>52 Week Range</td>
                            <td>{week52Low ? week52Low : null} - {week52High ? week52High : null}</td>
                        </tr>
                        <tr className='TR'>
                            <td className='TD'>Total Avg Volume</td>
                            <td>{avgTotalVolume ? avgTotalVolume : null}</td>
                        </tr>
                        <tr className='TR'>
                            <td className='TD'>Earnings Per Share</td>
                            <td>{actualEPS ? actualEPS : null}</td>
                        </tr>
                        <tr className='TR'>
                            <td className='TD'>Dividend & Yield</td>
                            <td>{dividendYield ? dividendYield : null}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </div>       
    )
}

export default KeyStats;