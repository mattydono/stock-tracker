import React, { useCallback, useState, useEffect } from 'react';
import styled from '@emotion/styled'
import './search.css'

const SearchContainer = styled.div`
    width: 100%;
    height: 10vh;
`

const Input = styled.input`
    width: 82%;
    background-color: rgba(0,0,0,0);
    color: white;
    font-size: 20px;
    outline: none;
    border: none;
`

const PriceStats = styled.div`
    width: 15%;
    display: flex;
    justify-content: space-evenly;
`

const RowContainer = styled.div`
    width: 100%;
    height: 40%;
    font-size: 20px;
    border-bottom: 1px solid #608fd1;;
    display: flex;
    flex-direction: row;
    justift-content: center;
    position: relative;
`

const Span = styled.span`
    font-size: 20px;
    color: ${props => props.positive ? 'green' : 'red'}
`

const SubInput = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
`

const DateOpen = styled.div`
    width: 50%;
    font-size: 15px;
    display: flex;
    justify-content: flex-end;
`

const SubSearch = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 1%;
    justify-content: space-between;
`

const Sub = styled.div`
    background-color: #41608a;
    border-radius: 5%;
    margin-left: 2%;
    padding: 0.5%;
`

const IconAlign = styled.div`
    width: 3%;
    height: 100px;
    position: relative;
    margin-right: 1px;
`

const Icon = styled.div`
    display: flex;
    font-size: 30px;
    transform: rotate(-45deg);
    width: 30px;
    height: 30px;
    color: #608fd1;
    position: absolute;
    top: -10%;
    left: 0;
`

const MarketStatus = styled.div`
   font-size: 15px;
   display: flex;
   flex-direction: row;
   align-text: right;
   position: relative;
   margin-left: 3%;
`

const MarketIcon = styled.div`
    color: ${props => props.open ? 'yellow' : 'gray'};
    font-size: 15px;
    position: absolute;
    top: -10%;
    left: -15%;
`

const StockList = styled.div`
    height: 100%;
    width: 95%;
    margin: 0 2.5% 0 2.5%;
    position: absolute;
    bottom: -100%;
    left: 0;
    z-index: 1;
`

const Search = ({ search, change, changePercent, latestPrice, primaryExchange, tags, latestTime, isUSMarketOpen }) => {

    const [query, setQuery] = useState('');
    const [stockList, setStockList] = useState([])

    const onKeyPress = event => {
        if(event.key === 'Enter') {
            search(query)
            event.preventDefault()
        }
    }

    const onStockClick = stock => {
        const stockSymbol = stock.symbol.toLowerCase()
        const stockName = stock.name.toLowerCase()
        setQuery(`${stockName} (${stockSymbol})`)
        search(stockSymbol)
        setStockList([])
        console.log(stockSymbol)
    }
    

    const renderStock = (stock) => {
        return <div className='stock' value={stock.name} onClick={() => onStockClick(stock)}>{stock.name} ({stock.symbol})</div>
    }

    useEffect(() => {

        if(query === '') {
            return setStockList([])
        }

        let isCleared = false;

        const timeoutId = setTimeout(async () => {
            const response = await fetch(`http://localhost:4000/stock/search/${query}`)
            const data = await response.json()
            if (!isCleared) {
                setStockList(data)
                console.log('setData')
            }
        }, 300);
        return () => { clearTimeout(timeoutId); isCleared = true }
    }, [query]);

    return (
        <SearchContainer>
            <RowContainer>
                <IconAlign><Icon>⚲</Icon></IconAlign>
                <Input placeholder='Stock Search Here' value={query} onChange={event => { setQuery(event.target.value) }} onKeyPress={onKeyPress} />
                <PriceStats>
                    {latestPrice ? latestPrice : null}
                    {!change ? null : change > 0 ? <Span positive> &#8593;{Math.abs(change)} | </Span> : <Span> &#8595;{Math.abs(change)} | </Span>}
                    {!changePercent ? null : changePercent > 0 ? <Span positive>{Math.abs(Math.round((changePercent * 100) * 100) / 100)}&#37;</Span> : <Span>{Math.abs(Math.round((changePercent * 100) * 100) / 100)}&#37;</Span>}
                </PriceStats>
                <StockList>
                    {stockList.length > 0 ? stockList.map( stock => renderStock(stock)) : null}
                </StockList>
            </RowContainer>
            <SubSearch>
                <SubInput>
                    <Sub>{primaryExchange}</Sub>
                    <Sub>{tags[0]}</Sub>
                    <Sub>{tags[1]}</Sub>
                </SubInput>
                <DateOpen>
                    {latestTime ? <>Real-Time Price as of {latestTime} EST</> : null}
                    {tags.length < 1 ? null : isUSMarketOpen ? <MarketStatus><MarketIcon open>☀</MarketIcon>Market Open</MarketStatus> : <MarketStatus><MarketIcon>☽ &nbsp;</MarketIcon> Market Closed</MarketStatus>}</DateOpen>
            </SubSearch>
        </SearchContainer>
    )

}

export default Search;