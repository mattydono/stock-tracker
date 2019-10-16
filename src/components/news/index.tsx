import React from 'react';
import { _News } from '../../models'
import './index.css'
import Loading from '../../gif/loading';
import Article from './article';

type NewsProps = {
    news: _News,
}

type ErrorLoading = {
    errorNews: any,
}

const News: React.FC<NewsProps & ErrorLoading> = ({ errorNews, news }) => {

    const News = news.length > 0 ? news.map(article => <Article {...article}/>) : <Loading />;

    const NewsError = news.length ? (
        <div style={{color: 'red', marginBottom: '1rem'}}>Connection to server lost.</div>
    ) : null;


    return (
        <div className='NewsContainer'>
            <span className='Title'>LATEST NEWS</span>
            {errorNews ? NewsError : null}
            {News}
        </div>
    )
}


export default News;