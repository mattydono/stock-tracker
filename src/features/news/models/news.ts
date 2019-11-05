export interface Article {
    url: string,
    headline: string,
    datetime: number,
    source: string
}

export type News = Article[]