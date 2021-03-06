import React from 'react';
import moment from 'moment';
import { _News } from '../../models'
import './index.css'
import loading from '../../gif/loading.gif'

type NewsProps = {
    news: _News,
    isFetchingNews: boolean,
}

const News: React.FC<NewsProps> = ({ isFetchingNews, news }) => {
    return (
        <div className={news.length > 0 ? 'NewsContainer' : 'NewsLoadingContainer' }>
            <span className='Title'>LATEST NEWS</span>
            { news.length < 1 ? <div className='NewsLoadingSymbolContainer'><img className='NewsLoading'src={loading} /></div> :
                news.map(article => {
                    const { url, headline, datetime, source } = article;
                    return (
                        <div className='Article'>
                            <a className='Link' href={url}>
                                <div style={{fontSize: '1.2rem'}} >{headline}</div>
                            </a>
                            <div style={{opacity: 0.5}} >{moment(datetime).fromNow()} - {source}</div>
                        </div>
                    )
                })
            }
            <div className='AlignNewsFetching'>
                {isFetchingNews && news.length > 0 ? <img className='NewsFetching' src={loading}/> : null}
            </div>
        </div>
    )
}


export default News;