import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled'
import { Article } from './models'
import { AppState } from 'models';
import { Title } from 'Root'
import { ArticleComponent } from './article';
import { Loader } from '../loader'
import { ErrorComponent } from 'features/error';


const NewsLayoutContainer = styled.div`
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

const ArticleLayoutContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    max-height: 400px;
    overflow: auto;
`

export const NewsComponent: FC = () => {

    const news = useSelector(({ news }: AppState) => news)
    const error = useSelector((state: AppState) => state.errors.news);

    const Loading = <Loader className='margin-top: 200px; @media(max-width: 750px) {margin-top: 50px; margin-bottom: 50px;};' size={50} seperation={2} speed={1.4} />

    const News = news.length > 0 ? news.map((article: Article) => <ArticleComponent key={article.headline} {...article}/>) : Loading;

    return (
        <NewsLayoutContainer>
            <Title>LATEST NEWS</Title>
            <ArticleLayoutContainer>{News}</ArticleLayoutContainer>
            {error && <ErrorComponent component='News' />}
        </NewsLayoutContainer>

    )
}
