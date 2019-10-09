import React from 'react';
import moment from 'moment';
import { _News } from '../../models'
import './index.css'

type NewsProps = {
    news: _News
}

const News: React.FC<NewsProps> = ({ news }) => {
    return (
        <div className='NewsContainer'>
            <span className='Title'>LATEST NEWS</span>
            {
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
        </div>
    )
}


export default News;