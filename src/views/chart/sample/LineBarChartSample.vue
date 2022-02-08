<template>
    <div style="margin-top: 20px">
        <button @click="zoomReset">Zoom Reset</button>
        <line-bar-chart ref="lineBarChart"
                        class="sizeClass"
                        :line-data="data"
                        :bar-data="nData"
                        :labels="xLabels"
                        :label-keys='["test 1", "test 2", "test 3", "test 4", "test 5", "test 6"]'
                        :options="options">
        </line-bar-chart>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import LineBarChart from '@/views/chart/LineBarChart.vue';
import jsonData from '@/data/chart-data.json';
import {Dataset} from '@/views/chart/utils';
import {ScriptableContext} from 'chart.js';
import {DefineComponent} from '@vue/runtime-core';

const component = defineComponent({
    name: 'LineBarChartSample',

    components: {LineBarChart},

    props: {},

    // computed: {
    //     data() {
    //         return new Dataset(this.valueKeys, jsonData.objItems);
    //     }
    // },

    setup(props, context) {
        const lineBarChart = ref();
        const xLabels = ['x label 1', 'x label 2', 'x label 3', 'x label 4', 'x label 5', 'x label 6', 'x label 7'];
        const valueKeys = ['key', 'key2', 'key3'];
        const data = reactive(new Dataset(valueKeys, jsonData.objItems));
        const nData = reactive(new Dataset([], jsonData.numItems));
        const options = {
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            },
            backgroundColor: function(context: ScriptableContext<any>) {
                const dataIndex = context.dataIndex;
                const index = dataIndex % 7;
                const colors = [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(119,117,119,0.2)'
                ];

                return colors[context.datasetIndex];
                // return colors[index];
            },
            borderColor: function(context: ScriptableContext<any>) {
                const dataIndex = context.dataIndex;
                const index = dataIndex % 7;
                const colors = [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(119,117,119, 1)'
                ];

                return colors[context.datasetIndex];
                // return colors[index];
            },
            borderWidth: 1
        };
        return {
            xLabels,
            data,
            nData,
            options,
            lineBarChart
        };
    },
    methods: {
        zoomReset() {
            const component = this.$refs.lineBarChart as DefineComponent;
            component.resetZoom();
            // this.lineBarChart.resetZoom();
        }
    }
});

export default component;
</script>

<style scoped>
.sizeClass {
    width: 1800px;
    height: 600px;
}
</style>