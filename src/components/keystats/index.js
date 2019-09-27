import React from 'react';
import styled from '@emotion/styled'
import { Title } from '../Root'

const KeyStatsContainer = styled.div`
   width: 75%;
   height: 30vh;
`

const TableContainer = styled.div`
    width: 100%;
    column-count: 2;
    font-size: 0.8rem;
`

const TD = styled.td`
    color: #41608a;
`

const TR = styled.tr`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid #0a2e63;
    margin-bottom: 1%;
`

const Table = styled.table`
    border-collapse: collapse;
    width: 90%;
`

const Tbody = styled.tbody`
    width: 100%;
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
    )
}

export default KeyStats;