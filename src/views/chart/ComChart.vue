<template>
    <div>
        <canvas id='myChart' :width='canvasSize.width' :height='canvasSize.height'></canvas>
    </div>
</template>

<script lang='ts'>

import * as types from './types';
import Chart from 'chart.js/auto';
import * as pattern from 'patternomaly';
// import {Chart, registerables} from 'chart.js';
// Chart.register(...registerables);


import {defineComponent, onMounted, watch, ref, reactive, readonly} from 'vue';
import {color} from 'chart.js/helpers';
import {
    ChartData,
    ChartOptions,
    ChartType,
    ChartTypeRegistry,
    DatasetController,
    ScriptableContext,
    TooltipItem
} from 'chart.js';
import {Model} from '@/views/chart/types';

export default defineComponent({
    name: 'com-chart',

    props: {
        data: {
            type: Array,
            default: () => []
        },

        xLabel: {
            type: String,
            default: 'xLabel'
        },

        yLabel: {
            type: String,
            default: 'yLabel'
        },

        label: {
            type: String,
            default: 'label'
        },

        width: {
            type: Number,
            default: 500
        },

        height: {
            type: Number,
            default: 300
        }
    },

    setup(props, context) {
        /* canvas Size */
        const canvasSize: types.Size = reactive({
            height: props.height,
            width: props.width
        });

        /* backgroundColor/borderColor */
        const colorFun = function(type: types.ColorType) {
            const colors = type === 'backgroundColor'? types.basicColors: types.basicBorders;

            return function(context: ScriptableContext<'bar'>): string {
                const dataIndex = context.dataIndex;
                const index = dataIndex % colors.length;
                return colors[index];
            }
        };

        /* chart data 설정*/
        const data: ChartData<types.Type, number[], string> = {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        type: 'bar',
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: colorFun('backgroundColor'),
                        borderColor: colorFun('borderColor'),
                        borderWidth: 1,
                        indexAxis: 'y',
                    },
                    {
                        type: 'line',
                        label: '# of Votes',
                        data: [5, 9, 17, 2, 10, 6],
                        borderColor: 'rgb(13,13,238)',
                        borderWidth: 1,
                        indexAxis: 'y',
                    }
                ]
            }
        /* chart options 설정*/
        const options:ChartOptions<types.Type> = {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }


        /* chart 생성 */
        if(props.data.length > 0) {
            let myChart: Chart<types.Type, number[], string>;
            onMounted(() => {
                if(!myChart) {
                    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
                    const ctx = canvas.getContext('2d');
                    if (ctx === null) return;
                    myChart = new Chart(canvas, {
                        type: 'bar',
                        data,
                        options
                    });
                }
            });

            /* chart data update */
            watch(
                () => [props.data, props.label],
                data => {
                    myChart.data.datasets[0].data = [1, 2, 3, 4, 5, 6];
                    myChart.update();
                }
            );
        }


        return {
            canvasSize
        };

    }
});
</script>

<style scoped>

</style>
