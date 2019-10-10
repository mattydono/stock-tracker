export interface _CompanyOverview {
    symbol: string | null,
    companyName: string | null,
    website: string | null,
    description: string | null,
    tags: string[],
    isFetchingCompany: boolean,
    errorCompany: boolean,
}