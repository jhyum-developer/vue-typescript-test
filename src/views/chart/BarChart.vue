<template>
    <div id='chart-container'>
        <canvas id='bar-chart'></canvas>
    </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, onMounted, reactive, watch} from 'vue';
import Chart from 'chart.js/auto';
import * as types from '@/views/chart/types';
import {ChartData, ChartOptions, ScriptableContext} from 'chart.js';
import {Dataset} from '@/views/chart/types';

const Component = defineComponent({
    name: "bar-chart",

    props: {
        items: {
            type: Array,
            default: () => []
        },

        data: {
            type: Array,
            default: () => new Array<Dataset>()
        },
        type: {
            type: String,
            default: 'vertical'
        },
        labels: {
          type: Array,
          default: () => ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
        },
        width: {
            type: Number,
            default: 500
        },
        height: {
            type: Number,
            default: 300
        },
        customOptions: {
            type: types.CustomOptions,
            default: () => new types.CustomOptions()
        }

    },

    setup(props, context) {
        const instance = getCurrentInstance()
        console.log(instance)
        /* setup 전역 변수 선언 */
        /*------------------------------------------------*/
        const data: ChartData<'bar', number[], string> = {labels: [], datasets: []};
        const chartOptions: ChartOptions<'bar'> = {responsive: true};

        const canvas = document.createElement('canvas');
        let barChart: Chart<'bar', number[], string> = new Chart(canvas,{type:'bar', data} );
        const options = reactive(props.customOptions);
        /*------------------------------------------------*/

        /* interface methods & params */
        /*------------------------------------------------*/
        const update = function(): void {
            barChart.update();
        }
        /*------------------------------------------------*/

        /* canvas Size */

        const container = document.getElementById('chart-container');
        if(container != null) {
            container.style.width = `${props.width}px`;
            container.style.height = `${props.height}px`;

        }

        /* labels 배열이 바뀔 때 */
        watch(() => props.labels, labels => {
            if (Array.isArray(labels)) data.labels = labels;
            update();
        }, {immediate: true});

        /* data 배열이 바뀔 때*/
        watch(() => props.data, datasets => {
            /* chart data 설정*/
            const key = options.valueKey;
            const labelKey = options.labelKey;

            /* {label, value} object 변환 */
            const convertedData = datasets.map(dataset => {
                const obj = dataset as Record<string, number[] | string>;
                return {
                    label: obj[labelKey] as string,
                    value: obj[key] as number[],
                    backgroundColor: obj.backgroundColor as string,
                    borderColor: obj.borderColor as string
                }
            })
            data.datasets = convertedData.map(data => {
                return {
                    label: data.label,
                    data: data.value,
                    backgroundColor: data.backgroundColor,
                    borderColor: data.borderColor,
                    borderWidth: props.customOptions.borderWidth,
                }
            });

            update();
        }, {immediate: true});


        /* chart options 설정*/
        chartOptions.maintainAspectRatio =false;
        switch (props.type) {
            case 'horizontal':
                chartOptions.indexAxis = 'y';
                types.minMaxFun('x', props.customOptions, chartOptions);
                break;
            case 'stacked':
                chartOptions.scales = {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                };
                types.minMaxFun('y', props.customOptions, chartOptions);
                break;
            case 'floating':
                break;
            default:
                types.minMaxFun('y', props.customOptions, chartOptions);
                break;

        }

        /* chart 생성 */
        if (props.data.length > 0) {
            onMounted(() => {
                const canvas = document.getElementById('bar-chart') as HTMLCanvasElement;
                const ctx = canvas.getContext('2d');
                if (ctx === null) return;
                barChart = new Chart(canvas, {
                    type: 'bar',
                    data,
                    options: chartOptions
                });
            });
        }


        return {
            barChart
        }
    },

    methods: {
        update() {
            console.log('chart update')
            debugger;
            this.barChart.update();
        }
    }
})

export default Component;
</script>

<style scoped>

</style>