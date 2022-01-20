<template>
    <div>
        <canvas id='lineBarChart'></canvas>
    </div>
</template>

<script lang='ts'>
import {Dataset} from '@/views/chart/utils';
import {Chart, ChartData, ChartDataset, ChartOptions, registerables} from 'chart.js';
import * as utils from '@/views/chart/utils';
import zoomPlugin from 'chartjs-plugin-zoom';
import {Mode} from 'chartjs-plugin-zoom/types/options';
import {defineComponent, onMounted, reactive, watch} from 'vue';

Chart.register(...registerables, zoomPlugin);

const component = defineComponent({
    name: 'line-bar-chart',

    props: {
        labels: {
            type: Array,
            default: () => ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7']
        },

        labelKeys: {
            type: Array,
            default: () => []
        },

        lineData: {
            type: Dataset,
            default: () => new Dataset()
        },

        barData: {
            type: Dataset,
            default: () => new Dataset()
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
        const data: ChartData<'line' | 'bar', (number| utils.Point)[], string> = {labels: [], datasets: []};
        const lineItems: Array<(number | utils.Point)[]> = props.lineData.getItems();
        const barItems: Array<(number | utils.Point)[]> = props.barData.getItems();

        /* Line Chart data Function */
        const lineFunction = (items: Array<(number | utils.Point)[]>): ChartDataset<'line' | 'bar', (number | utils.Point)[]>[] => {
            return items.map((item, index) => {
                return {
                    type: 'line' as 'line' | 'bar',
                    label: (props.labelKeys[index] || `line ${index}`) as string,
                    data: item
                };
            });
        };

        /* Bar Chart data Function */
        const barFunction = (items: Array<(number | utils.Point)[]>): ChartDataset<'line' | 'bar', (number | utils.Point)[]>[] => {
            return items.map((item, index) => {
                return {
                    type: 'bar' as 'line' | 'bar',
                    label: (props.labelKeys[lineItems.length + index] || `bar ${index}`) as string,
                    data: item
                };
            });
        };

        /* Line Chart data 가공 */
        const lineDatasets = lineFunction(lineItems);

        /* Bar Chart data 가공 */
        const barDatasets = barFunction(barItems);

        /* Line - Bar Chart Data Merge */
        data.datasets = [...lineDatasets, ...barDatasets];

        /* x축 Labels */
        data.labels = props.labels as string[];

        /* init options 추가 */
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

        /* custom options Merge */
        const options: ChartOptions<'line' | 'bar'> = reactive(props.options);
        options.maintainAspectRatio = options.maintainAspectRatio || initOptions.maintainAspectRatio;
        options.responsive = options.responsive || initOptions.responsive;
        options.plugins = options.plugins || initOptions.plugins;

        /* config */
        const config = {
            type: 'line' as 'line' | 'bar',
            data,
            options
        };

        /* chart 생성 */
        const canvas = document.createElement('canvas');
        let chart: Chart<'line' | 'bar', unknown[], string> = new Chart(canvas, {type: 'bar', data});
        onMounted(() => {
            const canvas = document.getElementById('lineBarChart') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (ctx === null) return;
            chart = new Chart(canvas, config);
        });

        watch(() => [props.lineData, props.barData], ([lineData, barData]) => {
            data.datasets = [...lineFunction(lineData.getItems()), ...barFunction(barData.getItems())];
            chart.update();
        }, {deep: true});

        const reset = () => {
            chart.resetZoom();
        };

        const chartUpdate = () => {
            chart.update();
        };

        return {
            reset,
            chartUpdate,
            chart
        };
    },

    methods: {
        update() {
            this.chartUpdate();
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