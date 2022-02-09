<template>
    <div style="margin-top: 20px">
        <button @click="zoomReset">Zoom Reset</button>
        <com-chart ref="pointChart"
                   class="sizeClass"
                   :data-info="dataInfo"
                   :label-keys='labelKeys'
                   chart-type="scatter"
                   :options="options">
        </com-chart>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import ComChart from '@/views/chart/ComChart.vue';
import {DataInfo, Dataset} from '@/views/chart/utils';
import jsonData from '@/data/chart-data.json';
import {ScriptableContext} from 'chart.js';

const component = defineComponent({
    name: 'PointChartSample',
    components: {ComChart},
    props: {},

    setup(props, context) {
        const pointChart = ref();
        const pointKeys = [
            {x: 'key3', y: 'key'},
            {x: 'key', y: 'key2'},
            {x: 'key2', y: 'key3'}
        ];
        const labelKeys = ["com 1", "com 2", "com 3"];
        const dataInfo: Array<Dataset> = [
            {
                type:'scatter',
                labelKey: 'label',
                valueKeys: pointKeys,
                items: jsonData.objItems,
                stacked: true
            }
        ]

        const options = {
            backgroundColor: function(context: ScriptableContext<any>) {
                const dataIndex = context.dataIndex;
                const index = dataIndex % 6;
                const colors = [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ];

                return colors[context.datasetIndex];
                // return colors[index];
            },
            borderColor: function(context: ScriptableContext<any>) {
                const dataIndex = context.dataIndex;
                const index = dataIndex % 6;
                const colors = [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ];

                return colors[context.datasetIndex];
                // return colors[index];
            },
            borderWidth: 1
        };

        return {
            labelKeys,
            dataInfo,
            options,
            pointChart
        };
    },
    methods: {
        zoomReset() {
            this.pointChart.resetZoom();
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