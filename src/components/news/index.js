import React from 'react';
import styled from '@emotion/styled'

const NewsContainer = styled.div`
    width: 50%;
    height: 60vh;
`

const News = ({ news }) => {

    return (
        <NewsContainer>
            <div>LATEST NEWS</div>
            {news.slice(0, 5).map(article => {
                return (
                    <div key ={article.datetime}>
                        <div>{article.headline}</div>
                        <div>{article.datetime}</div>
                    </div>
                )
            })}
        </NewsContainer>
    );
}

export default News;