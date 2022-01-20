import {isObject} from 'chart.js/helpers';

export type Point = {
    x: string | number;
    y: string | number;
    r?: string | number;
};

export class Dataset {
    keys: Array<string | Point>;
    items: Array<number[] | Record<string, unknown>>;

    constructor(keys?: Array<string | Point>, items?: Array<number[] | Record<string, unknown>>) {
        this.keys = keys || [];
        this.items = items || [];
    }

    getItems(): Array<(number | Point)[]> {
        if(Array.isArray(this.items[0])) return this.items as number[][];

        const results: Array<(number | Point)[]> = [];
        this.keys.forEach((key, keyIndex) => {
            results[keyIndex] = this.items.map(item => {
                const target = item as Record<string, number>;
                if (isObject(key)) {
                    const rKey = key.r || '';
                    return {
                        x: target[key.x],
                        y: target[key.y],
                        r: target[rKey]
                    };
                }
                return target[key];
            });
        });
        return results;
    }
}

