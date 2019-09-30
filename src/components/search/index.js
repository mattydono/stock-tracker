import React, { useState } from 'react';
import styled from '@emotion/styled'
import { tsBigIntKeyword } from '@babel/types';

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

const IconAlign= styled.div`
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

const Search = ({ search, change, changePercent, latestPrice, primaryExchange, tags, latestTime, isUSMarketOpen }) => {

    const [query, setQuery] = useState('');

    const onKeyPress = event => {
        if(event.key === 'Enter') {
            search(query)
            event.preventDefault()
        }
    }

    return (
            <SearchContainer>
                <RowContainer>
                    <IconAlign><Icon>⚲</Icon></IconAlign>
                    <Input placeholder='Stock Search Here' value={query} onChange={event => setQuery(event.target.value)} onKeyPress={onKeyPress}/>
                    <PriceStats>
                        {latestPrice ?  latestPrice : null}              
                        {!change ? null : change > 0 ? <Span positive> &#8593;{Math.abs(change)} | </Span> : <Span> &#8595;{Math.abs(change)} | </Span>} 
                        {!changePercent ? null : changePercent > 0 ? <Span positive>{Math.abs(Math.round((changePercent*100)*100)/100)}&#37;</Span> : <Span>{Math.abs(Math.round((changePercent*100)*100)/100)}&#37;</Span>}
                    </PriceStats>
                </RowContainer>
                <SubSearch>
                    <SubInput>
                        <Sub>{primaryExchange}</Sub>
                        <Sub>{tags[0]}</Sub>
                        <Sub>{tags[1]}</Sub>
                    </SubInput>
                    <DateOpen>
                        {latestTime ? <>Real-Time Price as of {latestTime} EST</>: null} 
                        {tags.length < 1 ? null : isUSMarketOpen ? <MarketStatus><MarketIcon open>☼</MarketIcon>Market Open</MarketStatus> : <MarketStatus><MarketIcon>☽ &nbsp;</MarketIcon> Market Closed</MarketStatus>}</DateOpen>
                </SubSearch>
            </SearchContainer>
    )

}

export default Search;