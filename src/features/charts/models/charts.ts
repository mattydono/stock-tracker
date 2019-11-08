import { Range } from './range'

export type ChartSingleDataPoint = {
    open: number,
    close: number,
    date: string,
}

export type  Charts = {
    range: Range,
    prices: ChartSingleDataPoint[]
}
