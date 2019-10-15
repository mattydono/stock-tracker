import React from 'react';
import { _KeyStats } from '../../models'
import loading from '../../gif/loading.gif'
import styled from '@emotion/styled'
import { Title } from '../Root'

const KeyStatsContainer = styled.div`
    flex: 3 0 0;
    @media(max-width: 800px) {
        margin-bottom: 40px;
    };
`

const TableContainer = styled.div`
    width: 100%;
    column-count: 2;
    font-size: 0.8rem;
    height: 100%;
`

const TD = styled.td`
    color: #41608a;
`

const TR = styled.tr`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    max-height: 50px;
    border-bottom: 1px solid #0a2e63;
    margin-bottom: 1%;
    font-size: 1.5rem;
    @media(max-width: 800px) {
        font-size: 0.8rem;
    };
    @media(max-width:1200px) {
        font-size: 1.1rem;
    };
`

const Table =styled.table`
    width: 90%;
`

const Tbody = styled.tbody`
    width: 100%;
`

const LoadingStats = styled.img`
    background-color: rgba(89, 89, 105, 0.2);
    border-radius: 5%;
    padding: 5% 40% 5% 40%;
`

const KeyStatsLoadingContainer = styled.div`
    flex: 3 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

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
    actualEPS,
    isFetchingQuote,
    errorQuote,
    }) => {

        const nullValues = (() => {
            if(!marketCap && !peRatio && !week52High && !week52Low && !avgTotalVolume && !previousClose && !low && !high && !volume && !open && !dividendYield && !actualEPS) {
                return true
            }
        })() 

    return (    
        <>
        {!nullValues ?
        <KeyStatsContainer>
            <Title>KEY STATS</Title>
            <TableContainer>
                 <Table>
                     <Tbody>
                        <TR>
                            <TD>Previous Close</TD>
                             <td>{previousClose ? previousClose : null}</td>
                         </TR>
                         <TR>
                             <TD>Day Range</TD>
                             <td>{low ? low : null} - {high ? high : null}</td>
                         </TR>
                         <TR>
                             <TD>Volume</TD>
                             <td>{volume ? volume : null}</td>
                         </TR>
                         <TR>
                             <TD>Market Cap</TD>
                             <td>{marketCap ? marketCap : null}</td>
                         </TR>
                         <TR>
                         <TD>P/E Ratio</TD>
                             <td>{peRatio ? peRatio : null}</td>
                         </TR>
                     </Tbody>
                 </Table>
                 <Table>
                     <Tbody>
                         <TR>
                             <TD>Open</TD>
                             <td>{open ? open : null}</td>
                         </TR>
                         <TR>
                             <TD>52 Week Range</TD>
                             <td>{week52Low ? week52Low : null} - {week52High ? week52High : null}</td>
                         </TR>
                         <TR>
                             <TD>Total Avg Volume</TD>
                             <td>{avgTotalVolume ? avgTotalVolume : null}</td>
                         </TR>
                         <TR>
                             <TD>Earnings Per Share</TD>
                             <td>{actualEPS ? actualEPS : null}</td>
                         </TR>
                         <TR>
                             <TD>Dividend & Yield</TD>
                             <td>{dividendYield ? dividendYield : null}</td>
                         </TR>
                     </Tbody>
                 </Table>
             </TableContainer>
        </KeyStatsContainer>
        :
        <KeyStatsLoadingContainer>
            <Title>KEY STATS</Title>
            <LoadingStats src={loading} />
        </KeyStatsLoadingContainer>
        }
        </>
    )
}

export default KeyStats;