import React from 'react';
import moment from 'moment';
import { _News } from '../../models'
import styled from '@emotion/styled'
import loading from '../../gif/loading.gif'
import { Title } from '../Root'

const NewsContainer =styled.div`
    flex: 0 1 25%;
`

const NewsLoadingContainer =styled.div`
    flex: 0 1 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NewsLoading = styled.img`
    padding: 30%;
    background-color: rgba(89, 89, 105, 0.2);
    border-radius: 5%;
`

const Article = styled.div`
    margin-bottom: 5%;
`

const Link = styled.a`
    text-decoration: none;
    color: white;
    &:hover {
        color: yellow;
    }
`

const NewsErrorContainer =styled.div`
    background-color: rgba(89, 89, 105, 0.2);
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5%;
    margin-bottom: 10px;
`

const NewsError = styled.div`
    font-size: 15rem;
    color: rgba(89, 89, 105, 0.2);
`

const NewsErrorMessage = styled.div`
    color: #c72820;
    font-weight: 700;
    font-size: 2rem;
`

type NewsProps = {
    news: _News,
    isFetchingNews: boolean,
    errorNews: any,
}

const News: React.FC<NewsProps> = ({ errorNews, isFetchingNews, news }) => {

    console.log(errorNews)

    return (
        <>
        {news.length > 0 ?
        <NewsContainer>
            <Title>LATEST NEWS</Title>
            {errorNews ? 
                <NewsErrorContainer>
                    <NewsError>⊗</NewsError>
                    <NewsErrorMessage>Error: 400</NewsErrorMessage>
                </NewsErrorContainer> : 
                null
            }
            { news.length < 1 && !errorNews ? <div className='NewsLoadingSymbolContainer'><img className='NewsLoading'src={loading} /></div> :
                news.map(article => {
                    const { url, headline, datetime, source } = article;
                    return (
                        <Article>
                            <Link href={url}>
                                <div style={{fontSize: '1.2rem'}} >{headline}</div>
                            </Link>
                            <div style={{opacity: 0.5}} >{moment(datetime).fromNow()} - {source}</div>
                        </Article>
                    )
                })
            }
        </NewsContainer>
        :
        <NewsLoadingContainer>
            <Title>LATEST NEWS</Title>
            <NewsLoading src={loading} />
        </NewsLoadingContainer>
        }
        </>
    )
}


export default News;