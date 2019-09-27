import React from 'react';
import styled from '@emotion/styled'
import {Title} from '../Root'

const NewsContainer = styled.div`
    width: 25%;
    height: 40vh;
`

const News = ({ news }) => {

    return (
        <NewsContainer>
            <Title>LATEST NEWS</Title>
            {news.slice(0, 5).map(article => {
                return (
                    <div key ={article.datetime}>
                        <div>{article.headline}</div>
                        <div>{article.datetime}</div>
                    </div>
                )
            })}
        </NewsContainer>
    );
}

export default News;