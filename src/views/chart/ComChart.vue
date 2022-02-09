<template>
    <div id="bar-container">
        <canvas id="chart"></canvas>
    </div>
</template>

<script lang="ts">
// import Chart from 'chart.js/auto';
import {
    Chart,
    registerables,
    ChartData,
    ChartOptions,
    ChartType,
} from 'chart.js';
import {defineComponent, onMounted, PropType, reactive, UnwrapRef, watch} from 'vue';
import zoomPlugin from 'chartjs-plugin-zoom';
import * as utils from '@/views/chart/utils';
import {DataInfo, Dataset} from '@/views/chart/utils';
import {ZoomPluginOptions} from 'chartjs-plugin-zoom/types/options';

Chart.register(...registerables, zoomPlugin);

const component = defineComponent({
    name: 'com-chart',

    props: {
        dataInfo: {
            type: Array as PropType<Array<Dataset>>,
            default: () => [new DataInfo()]
        },

        chartType: {
            type: String,
            default: 'bar'
        },

        options: {
            type: Object as PropType<ChartOptions>,
            default: () => {
                return {};
            }
        },

        zoom: {
            type: Boolean,
            default: false
        }
    },

    setup(props, context) {
        /* data 가공 */
        const data: ChartData<ChartType, utils.DataType, string> = {labels: [], datasets: []};
        const dataList:Array<DataInfo> = reactive(props.dataInfo) as Array<DataInfo>;

        const setData = (items: Array<Dataset>, data:ChartData<ChartType, utils.DataType, string>): void => {
            const labels: Array<string> = [];
            items.forEach(item => {
                const dataClz = new DataInfo(item.type, item.labelKey, item.valueKeys, item.items, item.stacked);
                data.datasets.push(...dataClz.getDataset());
                dataClz.getLabels().forEach(label => {
                    if(!labels.includes(label)) labels.push(label)
                });
            });

            data.labels = labels;
        };

        setData(dataList, data);
        /* init options */
        const initOptions: ChartOptions = {
            maintainAspectRatio: false,
            responsive: true
        };

        const zoomOption: ZoomPluginOptions = {
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
        };

        /* Custom Options Merge */
        const options: ChartOptions<ChartType> = reactive(props.options);
        options.maintainAspectRatio = options.maintainAspectRatio || initOptions.maintainAspectRatio;
        options.responsive = options.responsive || initOptions.responsive;
        options.plugins = options.plugins || initOptions.plugins || {};
        if(props.zoom) options.plugins.zoom = zoomOption;

        /* config */
        const config = {
            type: props.chartType as ChartType,
            data,
            options
        };

        /* chart 생성 */
        const canvas = document.createElement('canvas');
        let chart: Chart<ChartType, utils.DataType, string> = new Chart(canvas, {
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
        watch(() => dataList, (pData) => {
            setData(dataList, data);
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
