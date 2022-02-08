<template>
    <div id="bar-container">
        <canvas id="chart"></canvas>
    </div>
</template>

<script lang="ts">
// import Chart from 'chart.js/auto';
import {Chart, registerables, ChartData, ChartOptions, ChartType, ChartDataset} from 'chart.js';
import {defineComponent, onMounted, reactive, watch} from 'vue';
import zoomPlugin from 'chartjs-plugin-zoom';
import * as utils from '@/views/chart/utils';
import {DataInfo, Dataset, Point} from '@/views/chart/utils';

Chart.register(...registerables, zoomPlugin);

const component = defineComponent({
    name: 'com-chart',

    props: {
        labels: {
            type: Array,
            default: () => ['label1', 'label2', 'label3', 'label4', 'label5', 'label6', 'label7']
        },

        data: {
            type: Dataset,
            default: () => new Dataset()
        },

        dataInfo: {
            type: DataInfo || Array,
            default: () => new DataInfo()
        },

        labelKeys: {
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
        const data: ChartData<ChartType, Record<string, number> | utils.Point[], string> = {labels: [], datasets: []};
        const items: Array<(number | utils.Point)[]> = reactive(props.data.getItems());

        const dataFunction = (items: Array<(number | utils.Point)[]>): ChartDataset<ChartType, (number | utils.Point)[]>[] => {
            return items.map((item, index) => {
                return {
                    label: (props.labelKeys[index] || `dataset ${index}`) as string,
                    data: item
                };
            });
        };

        // data.datasets = dataFunction(items);
        data.datasets = reactive(props.dataInfo.getDataset());

        /* x축 Labels */
        // data.labels = props.labels as string[];

        /* init options */
        const initOptions: ChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'xy'
                    }
                }
            }
        };

        /* Custom Options Merge */
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
        let chart: Chart<ChartType, Record<string, number> | utils.Point[], string> = new Chart(canvas, {
            type: 'bar',
            data
        });
        onMounted(() => {
            const canvas = document.getElementById('chart') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (ctx === null) return;
            chart = new Chart(canvas, config);
        });

        /* items 비동기 처리 */
        watch(() => props.data, (pData) => {
            // data.datasets = dataFunction(pData.getItems());
            data.datasets = reactive(props.dataInfo.getDataset());
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
