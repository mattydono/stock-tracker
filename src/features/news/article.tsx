import React, { memo } from 'react';
import { Article } from './models/news';
import moment from 'moment';
import styled from '@emotion/styled'

const ArticleItemContainer = styled.div`
    font-weight: 400;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const Link = styled.a`
    text-decoration: none;
    color: white;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 5px;
    &:hover {
        color: #e0be86;
    };
`

const Time = styled.div`
    font-size: 14px;
    color: #beccdc;
    font-weight: 300;
`

const ArticleComponent: React.FC<Article> = ({ url, headline, datetime, source }) => {
    return (
        <ArticleItemContainer>
            <Link href={url} target='_blank'>
                <div style={{fontSize: 'inherit'}}>{headline}</div>
            </Link>
            <Time>{moment(datetime).fromNow()} - {source}</Time>
        </ArticleItemContainer>
    )
}

export default memo(ArticleComponent);