import React, { useState } from 'react';
import styled from '@emotion/styled'

const SearchContainer = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Input = styled.input`
    width: 80%;
    background-color: rgba(0,0,0,0);
    color: white;
    height: 60%;
    font-size: 20px;
    outline: none;
    border: none;
`

const PriceStats = styled.div`
    width: 20%;
`

const RowContainer = styled.div`
    width: 90%;
    height: 40%;
    font-size: 20px;
    border-bottom: 1px solid white;
    display: flex;
    flex-direction: row;
    justift-content: center;
`

const Span = styled.span`
    font-size: 15px;
`

const SubInput = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
`

const DateOpen = styled.div`
    text-align: right;
    width: 50%;
`

const SubSearch = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 1%;
`

const Sub = styled.div`
    background-color: #41608a;
    border-radius: 5%;
    margin-left: 2%;
`

const Search = ({ search, change, changePercent, latestPrice, primaryExchange, tags, latestTime, latestSource }) => {

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
                    <Input placeholder='Stock Search Here' value={query} onChange={event => setQuery(event.target.value)} onKeyPress={onKeyPress}/>
                    <PriceStats>
                        {latestPrice ?  latestPrice : null} 
                        {!change ? null : change > 0 ? <><Span>&#8593;</Span>{Math.abs(change)}</> : <><Span>&#8595;</Span>{Math.abs(change)}</>} 
                        {!changePercent ? null : <>{Math.abs(changePercent)}<Span>&#37;</Span></>}
                    </PriceStats>
                </RowContainer>
                <SubSearch>
                    <SubInput>
                        <Sub>{primaryExchange}</Sub>
                        <Sub>{tags[0]}</Sub>
                        <Sub>{tags[1]}</Sub>
                    </SubInput>
                    <DateOpen>{latestTime} {latestSource}</DateOpen>
                </SubSearch>
            </SearchContainer>
    )

}

export default Search;