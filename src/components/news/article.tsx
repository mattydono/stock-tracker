import React from 'react';
import { _Article } from '../../models';
import moment from 'moment';

const Article: React.FC<_Article> = ({ url, headline, datetime, source }) => {
    return (
        <div className='Article'>
            <a className='Link' href={url}>
                <div style={{fontSize: '1.2rem'}} >{headline}</div>
            </a>
            <div style={{opacity: 0.5}} >{moment(datetime).fromNow()} - {source}</div>
        </div>
    )
}

export default Article;