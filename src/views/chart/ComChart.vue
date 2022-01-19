<template>
    <div id='bar-container'>
        <canvas id='chart'></canvas>
    </div>
</template>

<script lang='ts'>


// import {Chart, registerables} from 'chart.js';
// Chart.register(...registerables);


import Chart from 'chart.js/auto';
import {defineComponent, onMounted, reactive} from 'vue';
import {
    ChartData,
    ChartOptions, ChartType,
} from 'chart.js';
import {isArray} from 'chart.js/helpers';
import zoomPlugin from 'chartjs-plugin-zoom';
import {Mode} from 'chartjs-plugin-zoom/types/options';
Chart.register(zoomPlugin);

const component = defineComponent({
    name: 'com-chart',

    props: {
        xLabels: {
            type: Array,
            default: () => []
        },

        yLabels: {
            type: Array,
            default: () => []
        },

        labelKeys: {
            type: Array,
            default: () => []
        },

        valueKeys: {
            type: Array,
            default: () => []
        },

        items: {
            type: Array,
            default: () => []
        },

        chartType: {
            type: String,
            default: 'bar'
        },

        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },

    setup(props, context) {
        /* data 가공 */
        const data: ChartData<ChartType, number[], string> = {labels: [], datasets: []};
        if (props.items.length > 0 && isArray<number>(props.items[0])) {
            data.datasets = [{data: props.items as number[]}];
        }
        else if(props.items.length > 0) {
            const items: number[][] = [];
            props.valueKeys.forEach((key, keyIndex) => {
                items[keyIndex] = props.items.map(item => {
                    const target = item as Record<string, number>;
                    const field = key as string
                    return target[field];
                });
            });

            data.datasets = items.map((item, index) => {
                return {
                    label: (props.labelKeys[index] || `dataset ${index}`) as string,
                    data: item
                }
            });

            data.labels = props.xLabels as string[];
        }

        /* options 추가 */
        const initOptions = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy' as Mode
                    },
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'xy' as Mode
                    }
                }
            }
        };
        const options: ChartOptions<ChartType> = reactive(props.options);
        options.maintainAspectRatio = options.maintainAspectRatio || initOptions.maintainAspectRatio;
        options.responsive = options.responsive || initOptions.responsive;
        options.plugins = options.plugins || initOptions.plugins;

        /* config */
        const config = {
            type: props.chartType as ChartType,
            data,
            options
        };

        /* chart 생성 */
        const canvas = document.createElement('canvas');
        let chart: Chart<ChartType, unknown[], string> = new Chart(canvas, {type: 'bar', data});
        onMounted(() => {
            const canvas = document.getElementById('chart') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (ctx === null) return;
            chart = new Chart(canvas, config);
        });

        const reset = () => {
            chart.resetZoom();
        };

        return {
            reset,
            chart
        };
    },

    methods: {
        update() {
            this.chart.update();
        },
        resetZoom() {
            this.reset();
        }
    }

});

export default component;
</script>

<style scoped>

</style>
