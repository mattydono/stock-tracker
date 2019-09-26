import React, { useState } from 'react';
import styled from '@emotion/styled'

const SearchContainer = styled.div`
    width: 100%;
    height: 10vh;
`

const Input = styled.input`
    width: 100%;
`

const Search = ({ search }) => {

    const [query, setQuery] = useState('');

    // return (
    //     <SearchContainer>
    //         <form 
    //         onSubmit={event => {
    //                 search(query);
    //                 event.preventDefault();
    //             }}
    //         >
    //             <Input 
    //                 type="text" 
    //                 value={query} 
    //                 onChange={event => setQuery(event.target.value)}
    //             />
    //             <button type="submit">Search</button>
    //         </form>
    //     </SearchContainer>
    // )

    const onKeyPress = event => {
        if(event.key === 'Enter') {
            search(query)
            event.preventDefault()
        }
    }

    return (
            <SearchContainer>
                <Input placeholder='Stock Search Here' value={query} onChange={event => setQuery(event.target.value)} onKeyPress={onKeyPress}/>
            </SearchContainer>
    )

}

export default Search;