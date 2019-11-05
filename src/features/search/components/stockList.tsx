import React, { Dispatch, SetStateAction, RefObject, memo } from 'react'
import styled from '@emotion/styled'

const StockListLayoutContainer = styled.div`
    position: absolute;
    margin: 0 2.5% 0 2.5%;
    width: 100%;
    top: 63px;
    left: -2.5%;
    z-index: 1;
    outline: none;
    background-image: linear-gradient(to bottom, #001330 2%, rgba(0, 8, 19, 0.8) 177%);
    box-shadow: 0 7px 10px 5px rgba(0, 0, 0, 0.5);
    padding-top: 19px;
    padding-bottom: 29px;
    @media(max-width: 1000px) {
        top: 126px;
    };
`

const TdSymbol = styled.td`
    color: #0068ff;
    padding-top: 8px;
    padding-bottom: 8px;
    max-width: 12px;
`

const TdName = styled.td`
    color: #fff;
    padding-top: 8px;
    padding-bottom: 8px;
    position: absolute;
    left: 60px;
`

const TR = styled.tr`
    margin-bottom: 100%;
    position: relative;
    &:hover {
        background-color: rgba(0, 104, 255, 0.5);
        cursor: pointer;
        padding-right: 100%;
    }
`

const TdEx = styled.span`
    font-size: 14px;
    padding: 2px;
    background-color: rgba(128, 180, 255, 0.13);
    border-radius: 2px;
    color:rgba(255,255,255, 0.5);
    margin-left: 10px;
`

type _Stock = {
    name: string,
    symbol: string,
    exchange?: string
}

type StockListItem = {
    symbol: string,
    name: string
}

type StockListProps = {
    setQuery: Dispatch<SetStateAction<string>>,
    inputSelect: RefObject<HTMLInputElement>,
    search: (query: string) => void,
    setSelectedStock: Dispatch<SetStateAction<string[]>>,
    setStockList: Dispatch<SetStateAction<StockListItem[]>>,
    dropSelect: RefObject<HTMLDivElement>,
    stockList: StockListItem[],
}

export const StockList = memo<StockListProps>(({setQuery, inputSelect, search, setStockList, setSelectedStock, dropSelect, stockList}) => {

    const onStockClick = (stock: _Stock) => {
        const stockSymbol = stock.symbol
        const stockName = stock.name
        setQuery(`${stockName} (${stockSymbol})`)
        inputSelect.current!.blur()
        search(stockSymbol)
        setStockList([])
        setSelectedStock([`${stock.name}`, `(${stock.symbol})`])
    }

    const renderSymbols = (stock: _Stock) => {
        return (
                <TR key={stock.name} onClick={() => onStockClick(stock)}>
                    <TdSymbol>{stock.symbol}</TdSymbol>
                    <TdName>{stock.name} <TdEx>{stock.exchange}</TdEx></TdName>
                </TR>
        )
    }

    return (
        <StockListLayoutContainer ref={dropSelect} tabIndex={-1}>
            <table style={{width: '100%'}}>
                <tbody style={{fontSize: '18px'}}>
                    {stockList.map( stock => renderSymbols(stock))}
                </tbody> 
            </table>               
        </StockListLayoutContainer>
    )
})