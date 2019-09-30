import React from 'react';
import styled from '@emotion/styled'
import {Title} from '../Root'

const NewsContainer = styled.div`
    width: 25%;
    height: 35vh;
`

const LatestNews = styled.div`
    color: #9c8c6f;
    margin-bottom: 5%;
    font-size: 0.7rem;
`

const Article = styled.div`
    margin-bottom: 5%;
    font-size: 0.7rem;
`

const News = ({ news }) => {

    console.log(news)
    return (
        <NewsContainer>
            <Title>LATEST NEWS</Title>
            {news.slice(0, 1).map(article => 
            <LatestNews>
                <div>{article.headline}</div>
                <div>{article.datetime} - {article.source}</div>
            </LatestNews>)}
            {news.slice(1, 5).map(article => {
                return (
                    <Article key ={article.datetime}>
                        <div>{article.headline}</div>
                        <div>{article.datetime} - {article.source}</div>
                    </Article>
                )
            })}
        </NewsContainer>
    );
}

export default News;