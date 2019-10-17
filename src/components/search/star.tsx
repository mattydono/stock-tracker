import React from 'react';
import styled from '@emotion/styled';

const StarContainer = styled.div`
    cursor: pointer;
`

const Span = styled.span`
    font-size: 30px;
    float: right;
`

type StarProps = {
    favorites?: string[],
    ticker: string,
    add: (ticker: string) => void,
    remove: (ticker: string) => void,
}

const Star: React.FC<StarProps> = ({ favorites, ticker, add, remove }) => {

    const isFavorite = favorites && favorites.includes(ticker)

    return (
        <StarContainer>
            {isFavorite ? <Span onClick={() => remove(ticker)} >&#9733;</Span> : <Span onClick={() => add(ticker)} >&#9734;</Span> }
        </StarContainer>
    )
}

export default Star;