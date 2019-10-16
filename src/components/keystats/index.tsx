import React from 'react';
import { _KeyStats } from '../../models'
import './index.css'
import loading from '../../gif/loading.gif'

const KeyStats: React.FC<_KeyStats & any> = ({
    isFetchingQuote,
    errorQuote,
    ...keystatsProps
    }) => {

    const nullValues = Object.values(keystatsProps).every(item => !item);

    const {
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
        actualEPS,
    } = keystatsProps;

    const KeySatsError = <div style={{color: 'red', marginBottom: '1rem'}}>{nullValues ? 'Fetching stats failed' : 'Connection to server lost'}</div>;

    return (
        <div className={nullValues ? 'KeyStatsLoadingContainer' : 'KeyStatsContainer'}>
            <span className='Title'>KEY STATS &nbsp; &nbsp; {errorQuote ? KeySatsError : ''}</span>
            {errorQuote ? 
                <div className='StatsErrorContainer'>
                    <div className='StatsError'>⊗</div>
                    <div className='StatsErrorMessage'>{errorQuote.message}</div>
                </div> : 
                null
            }
            {nullValues && !errorQuote ? <img className='LoadingStats' src={loading} /> : errorQuote ? null : 
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
            </div>}
        </div>
    )
}

export default KeyStats;