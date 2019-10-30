import { Range } from './range'
export interface _ChartSingleDataPoint {
    open: number,
    close: number,
    date: string,
}

export interface _Charts {
    range: Range,
    prices: _ChartSingleDataPoint[]
}
