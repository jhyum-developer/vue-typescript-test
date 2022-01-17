import {ChartOptions, ChartType, ScriptableContext} from 'chart.js';

export interface Size {
    height: number;
    width: number;
}

export type Type = 'line' | 'bar';

export type Dataset = {
    label: string;
    value: Array<number>;
    backgroundColor: ((context:ScriptableContext<ChartType>) => string) | string | Array<string>;
    borderColor: ((context:ScriptableContext<ChartType>) => string) | string | Array<string>;
}

export class CustomOptions {
    dataLabel: string;
    labelKey: string;
    valueKey: string;
    min: number | null;
    max: number | null;

    borderWidth: number;
    constructor() {
        this.dataLabel = 'dataset 1';
        this.labelKey = '';
        this.valueKey = '';
        this.min = null;
        this.max = null;
        this.borderWidth = 1;
    }
}

export const minMaxFun = function(axis:string, customOptions: CustomOptions, options: ChartOptions):void {
    const min = customOptions?.min;
    const max = customOptions?.max;

    options.scales = options.scales || {};
    if(axis === 'x') {
        options.scales.x = options.scales.x || {};

        if(min !== null) options.scales.x.min = +min;
        if(max !== null) options.scales.x.max = +max;
    }

    options.scales.y = options.scales.y || {};

    if(min !== null) options.scales.y.min = +min;
    if(max !== null) options.scales.y.max = +max;

};



