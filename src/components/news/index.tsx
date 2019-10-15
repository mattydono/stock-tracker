import React from 'react';
import { _News } from '../../models'
import './index.css'
import loading from '../../gif/loading.gif';
import FetchingError from '../errors/errorFetching';
import Article from './article';

type NewsProps = {
    news: _News,
}

type ErrorLoading = {
    errorNews: any,
    isFetchingNews: boolean,
}

const News: React.FC<NewsProps & ErrorLoading> = ({ errorNews, isFetchingNews, news }) => {

    const Loading = (<div className='NewsLoadingSymbolContainer'><img className='NewsLoading'src={loading} /></div>)

    const News = news.length > 0 ? news.map(article => <Article {...article}/>) : Loading;

    const NewsError = <FetchingError message={errorNews.message}/>


    return (
        <div className={news.length > 0 ? 'NewsContainer' : 'NewsLoadingContainer' }>
            <span className='Title'>LATEST NEWS</span>
            {errorNews ? NewsError : News}
            <div className='AlignNewsFetching'>
                {isFetchingNews && news.length > 0 ? <img className='NewsFetching' src={loading}/> : <img className='NewsFetching' /> }
            </div>
        </div>
    )
}


export default News;