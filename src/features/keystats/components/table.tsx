import React, { memo } from 'react'
import styled from '@emotion/styled'
import { KeyStats } from '../models'

const TableLayoutContainer = styled.div`
    width: 100%;
    column-count: 2;
    column-gap: 47px;
    @media(max-width: 750px) {
        flex-direction: column;
        align-items: center;
        column-count: 1;
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
    width: 100%;
    margin-top: -10px;
`

const Tbody = styled.tbody`
    width: 100%;
`

const Col = styled.div`
    display: flex;
`

const numberWithCommas = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TableRow = (key: string, value: number | string) => {
    return (
        <TR key={key}>
            <TD>{key}</TD>
            <td>{value ? value : null}</td>
        </TR>
    )
}

export const StatsTable = memo<KeyStats>(({
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
}) => {

    const statsData = {
        'Previous Close': previousClose ? previousClose : 'N/A',
        'Day Range': `${low ? low : 'N/A'} - ${high ? high : 'N/A'}`,
        'Volume': volume ? numberWithCommas(volume) : 'N/A',
        'Market Cap': marketCap ? numberWithCommas(marketCap) : 'N/A',
        'P/E Ratio': peRatio ? peRatio : 'N/A',
        'Open': open ? open : 'N/A',
        '52 Week Range': `${week52Low ? week52Low : 'N/A'} - ${week52High ? week52High : 'N/A'}`,
        'Total Avg Volume': avgTotalVolume ? numberWithCommas(avgTotalVolume) : 'N/A',
        'Earnings Per Share': actualEPS ? actualEPS : 'N/A',
        'Dividend & Yield': dividendYield ? dividendYield : 'N/A',
    }

    return (
        <TableLayoutContainer>
            <Col>
                <Table>
                    <Tbody>
                        {Object.entries(statsData).map(([key, value]) => TableRow(key, value))}
                    </Tbody>
                </Table>
            </Col>
        </TableLayoutContainer>
    )
})