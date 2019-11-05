import { Range } from './range'
export interface ChartSingleDataPoint {
    open: number,
    close: number,
    date: string,
}

export interface Charts {
    range: Range,
    prices: ChartSingleDataPoint[]
}
