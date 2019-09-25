import React, { useState } from 'react';

const Search = ({ search }) => {

    const [query, setQuery] = useState('');

    return (
        <form
            onSubmit={event => {
                search(query);
                event.preventDefault();
            }}
        >
            <input 
                type="text" 
                value={query} 
                onChange={event => setQuery(event.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )

}

export default Search;