import React from 'react';
import { _KeyStats } from './models/keyStats'
import styled from '@emotion/styled'
import { Title } from '../Root'
import AdaptiveLoader from '../loader/Loader'

const KeyStatsContainer = styled.div`
    flex: 0 1 63%;
`

const TableContainer = styled.div`
    width: 100%;
    display flex;
    justify-content: space-between;
    @media(max-width: 750px) {
        flex-direction: column;
        align-items: center;
    };
`

const TD = styled.td`
    color: #beccdc;
    font-size: 14px;
    font-weight: 300;
`

const TR = styled.tr`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 46px;
    max-height: 46px;
    border-bottom: 1px solid #0a2e63;
    margin-bottom: 1%;
    font-size: 16px;
    font-weight: 400;
    @media(max-width: 1099px) {
        font-size: 17px;
    }
`

const Table =styled.table`
    width: 90%;
    margin-top: -10px;
`

const TableDivide = styled.div`
    width: 90px;
    @media(max-width: 1099px) {
        width: 68px;
    };
    @media(max-width: 588px) {
        display: none;
    };
`

const Tbody = styled.tbody`
    width: 100%;
`

const KeyStatsLoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    @media(max-width: 750px) {
        margin-top: 50px;
        margin-bottom: 50px;
    }
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

const numberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

    return (    
        <KeyStatsContainer>
            <Title>KEY STATS</Title>
            {!nullValues ?
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
                             <td>{volume ? numberWithCommas(volume) : null}</td>
                         </TR>
                         <TR>
                             <TD>Market Cap</TD>
                             <td>{marketCap ? numberWithCommas(marketCap) : null}</td>
                         </TR>
                         <TR>
                         <TD>P/E Ratio</TD>
                             <td>{peRatio ? peRatio : null}</td>
                         </TR>
                     </Tbody>
                 </Table>
                 <TableDivide />
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
                             <td>{avgTotalVolume ? numberWithCommas(avgTotalVolume) : null}</td>
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
             : !errorQuote ?
             <KeyStatsLoadingContainer>
                <AdaptiveLoader size={50} seperation={2} speed={1.4} />
             </KeyStatsLoadingContainer> 
             :
            <StatsErrorContainer>
                <StatsError>⊗</StatsError>
                <StatsErrorMessage>{errorQuote.message}</StatsErrorMessage>
            </StatsErrorContainer>
            } 
        </KeyStatsContainer>
    )
}

export default KeyStats;