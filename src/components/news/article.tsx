import React from 'react';
import { _Article } from '../../models';
import moment from 'moment';
import styled from '@emotion/styled'

const ArticleItem = styled.div`
    margin-bottom: 5%;
    font-weight: 400;
`

const Link = styled.a`
    text-decoration: none;
    color: white;
    font-weight: 300;
    font-size: 1.5rem;
    &:hover {
        color: #e0be86;
    };
    @media(max-width: 1100px) {
        font-size: 1.3rem;
    };
    @media(max-width: 800px) {
        font-size: 1.1rem;
    }
`

const Article: React.FC<_Article> = ({ url, headline, datetime, source }) => {
    return (
        <ArticleItem>
            <Link href={url}>
                <div style={{fontSize: 'inherit'}}>{headline}</div>
            </Link>
            <div style={{opacity: 0.5}} >{moment(datetime).fromNow()} - {source}</div>
        </ArticleItem>
    )
}

export default Article;