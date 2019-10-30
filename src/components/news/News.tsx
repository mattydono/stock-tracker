import React from 'react';
import { _News } from './models/news'
import styled from '@emotion/styled'
import { Title } from '../Root'
import Article from './article';
import AdaptiveLoader from '../loader/Loader'

const NewsContainer =styled.div`
    flex: 0 1 34%;
    margin-top: 40px;
    margin-left: 26px;
    max-height: 400px;
    @media(max-width: 1000px) {
        margin-left: 29px;
    }
    @media(min-width: 750px) {
        min-width: 250px;
    };
    @media(max-width: 750px) {
        margin-top: 0;
        margin-left: 0;
    }
`

const ArticleContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-height: 400px;
    overflow: auto;
`

const NewsLoadingContainer =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
    @media(max-width: 750px) {
        margin-top: 50px;
        margin-bottom: 50px;
    };
`

type NewsProps = {
    news: _News,
    isFetchingNews: boolean,
}

type ErrorLoading = {
    errorNews: {
        message: string,
    },
}

const News: React.FC<NewsProps & ErrorLoading> = ({ errorNews, news }) => {

    const Loading = <NewsLoadingContainer><AdaptiveLoader size={50} seperation={2} speed={1.4} /></NewsLoadingContainer>

    const News = news.length > 0 ? news.map(article => <Article key={article.headline} {...article}/>) : Loading;

    const NewsError = news.length > 0 ? (
        <div style={{color: 'red', marginBottom: '1rem'}}>Connection to server lost.</div>
    ) : null;


    return (
        <NewsContainer>
            <Title>LATEST NEWS</Title>
            {errorNews.message.length > 0 ? NewsError : <ArticleContainer>{News}</ArticleContainer>}
        </NewsContainer>

    )
}


export default News;