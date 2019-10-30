export interface _PriceSingleDataPoint {
    ticker: string,
    latestPrice: number,
    change: number | null,
    changePercent: number | null,
    error: boolean,
}

export type _Prices = _PriceSingleDataPoint[];
