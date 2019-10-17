import React from 'react';
import { _KeyStats } from '../../models'
import loading from '../../gif/loading.gif'
import styled from '@emotion/styled'
import { Title } from '../Root'

const KeyStatsContainer = styled.div`
    flex: 0 1 65%;
`

const TableContainer = styled.div`
    width: 100%;
    display flex;
    justify-content: space-between;
    font-size: 0.8rem;
    height: 100%;
    @media(max-width: 500px) {
        flex-direction: column;
        align-items: center;
    };
`

const TD = styled.td`
    color: #41608a;
`

const TR = styled.tr`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 50px;
    max-height: 50px;
    border-bottom: 1px solid #0a2e63;
    margin-bottom: 1%;
    font-size: 1.5rem;
    @media(max-width: 1099px) {
        font-size: 17px;
    }
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
`

const KeyStatsLoadingContainer = styled.div`
    flex: 0 1 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const StatsErrorContainer = styled.div`
    background-color: rgba(89, 89, 105, 0.2);
    display: flex;
    height: 100%;
    width: 80%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5%;
    margin-bottom: 10px;
`

const StatsError = styled.div`
    font-size: 180px;
    color: rgba(89, 89, 105, 0.2);
`

const StatsErrorMessage = styled.div`
    color: #c72820;
    font-weight: 700;
    font-size: 2rem;
    text-align: center;
`

const KeyStats: React.FC<_KeyStats & any> = ({
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

    const nullValues = !marketCap && !peRatio && !week52High && !week52Low && !avgTotalVolume && !previousClose && !low && !high && !volume && !open && !dividendYield && !actualEPS;

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
        : nullValues && !errorQuote ?
        <KeyStatsLoadingContainer>
            <Title>KEY STATS</Title>
            <LoadingStats src={loading} />
        </KeyStatsLoadingContainer>
        :
        <StatsErrorContainer>
            <StatsError>⊗</StatsError>
            <StatsErrorMessage>{errorQuote.message}</StatsErrorMessage>
        </StatsErrorContainer> 
        }
        </>
    )
}

export default KeyStats;