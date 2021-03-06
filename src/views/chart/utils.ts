import {isNumber, isObject} from 'chart.js/helpers';
import {ChartData, ChartDataset, ChartType} from 'chart.js';

export type Point = {
    x: string | number;
    y: string | number;
    r?: string | number;
};

export type DataType = Record<string, number | number[]> | Point[];

type Func = (...age: any[]) => string;

export type Dataset = {
    type: ChartType;
    labelKey: string | Func;
    valueKeys: Array<string | Point>;
    items: Array<number[] | Record<string, unknown>>;
    stacked: boolean;
}

export class DataInfo {
    type: ChartType;
    labelKey: string | Func;
    valueKeys: Array<string | Point>;
    items: Array<number[] | Record<string, unknown>>;
    stacked: boolean;
    private readonly dataset: ChartDataset<ChartType, DataType>[];
    private static STACK = 0;

    constructor(type?: ChartType, labelKey?: string | Func, valueKeys?: Array<string | Point>, items?: Array<number[] | Record<string, unknown>>, stacked?: boolean) {
        this.type = type || 'bar';
        this.labelKey = labelKey || 'label';
        this.valueKeys = valueKeys || ['value'];
        this.items = items || [];
        this.stacked = stacked || false;
        this.dataset = [];
        this.makeData();
    }

    getLabel(key: string | Func, item: number[] | Record<string, unknown>): string {
        if (typeof key === 'function') {
           return key();
        }

        if(isNumber(item)) {
            return key;
        }

        return item[key] as string;
    }

    getDataArray(): Array<DataType> {
        if (Array.isArray(this.items[0])) {
            return this.items.map(item => {
                const target = item as number[];
                const result = {};
                target.forEach(numArray => {
                    const label = this.getLabel(this.labelKey, target);
                    result[label] = numArray;
                });
                return result;
            });
        }

        const results: Array<DataType> = [];
        this.valueKeys.forEach((key, keyIndex) => {
            const data: Record<string, number | number[]> = {};

            if (isObject(key)) {
                results[keyIndex] = this.items.map(item => {
                    const target = item as Record<string, number>;
                    const rKey = key.r || '';
                    return {
                        x: target[key.x],
                        y: target[key.y],
                        r: target[rKey]
                    };
                });

            } else {
                this.items.forEach(item => {
                    const label = this.getLabel(this.labelKey, item);
                    data[label] = item[key] as number | number[];
                });

                results[keyIndex] = data;
            }
        });

        return results;
    }

    private makeData(): void {
        const items = this.getDataArray();
        const stack = this.stacked ? `stack${DataInfo.STACK++}` : undefined;

        items.forEach(data => {
            this.dataset.push({
                type: this.type,
                data,
                stack
            });
        });
    }

    getDataset(): ChartDataset<ChartType, DataType>[] {
        return this.dataset;
    }

    getLabels() {
        return this.items.map(item => this.getLabel(this.labelKey, item));
    }
}
