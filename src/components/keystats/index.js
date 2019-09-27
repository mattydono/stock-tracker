import React from 'react';
import styled from '@emotion/styled'

const KeyStatsContainer = styled.div`
    width: 50%;
    height: 20vh;
    column-count: 2;
`

const TD = styled.td`
    color: #779bd4;
`

const KeyStats = ({
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
        <KeyStatsContainer>
         <table>
             <tbody>
                 <tr>
                     <TD>Previous Close</TD>
                     <td>{previousClose ? previousClose : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>Day Range</TD>
                     <td>{low ? low : 'N/A'} - {high ? high : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>Volume</TD>
                     <td>{volume ? volume : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>Market Cap</TD>
                     <td>{marketCap ? marketCap : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>P/E Ratio</TD>
                     <td>{peRatio ? peRatio : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>Open</TD>
                     <td>{open ? open : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>52 Week Range</TD>
                     <td>{week52Low ? week52Low : 'N/A'} - {week52High ? week52High : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>Total Avg Volume</TD>
                     <td>{avgTotalVolume ? avgTotalVolume : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>Earnings Per Share</TD>
                     <td>{actualEPS ? actualEPS : 'N/A'}</td>
                </tr>
                 <tr>
                     <TD>Dividend & Yield</TD>
                     <td>{dividendYield ? dividendYield : 'N/A'}</td>
                </tr>
             </tbody>
         </table>   
        </KeyStatsContainer>       
    )
}

export default KeyStats;