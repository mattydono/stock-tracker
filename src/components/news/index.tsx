import React from 'react';
import { _News } from '../../models'
import styled from '@emotion/styled'
import loading from '../../gif/loading.gif'
import { Title } from '../Root'
import FetchingError from '../errors/errorFetching';
import Article from './article';

const NewsContainer =styled.div`
    flex: 0 1 35%;
    margin-top: 40px;
    margin-left: 40px;
    @media(max-width: 750px) {
        margin-top: 0;
    }
`

const ArticleContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const NewsLoadingSymbolContainer =styled.div`
    flex: 0 1 35%;
    background-color: rgba(89, 89, 105, 0.2);
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NewsLoading = styled.img`
    // background-color: rgba(89, 89, 105, 0.2);
    // border-radius: 5%;
`

type NewsProps = {
    news: _News,
    isFetchingNews: boolean,
}

type ErrorLoading = {
    errorNews: any,
}

const News: React.FC<NewsProps & ErrorLoading> = ({ errorNews, news }) => {

    const Loading = (<NewsLoadingSymbolContainer><NewsLoading src={loading} /></NewsLoadingSymbolContainer>)

    const News = news.length > 0 ? news.map(article => <Article {...article}/>) : Loading;

    const NewsError = news.length ? (
        <div style={{color: 'red', marginBottom: '1rem'}}>Connection to server lost.</div>
    ) : null;


    return (
        <NewsContainer>
            <Title>LATEST NEWS</Title>
            {errorNews ? NewsError : <ArticleContainer>{News}</ArticleContainer>}
        </NewsContainer>

    )
}


export default News;