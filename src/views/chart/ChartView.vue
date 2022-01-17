<template>
    <div>
        <h1>Chart Test By Typescript</h1>
        <button @click="changeData">data button</button>
        <button @click="changeLabel">label button</button>
        <button @click="update">update button</button>
        <com-chart v-if='false' :data='data' :label='label'></com-chart>
        <bar-chart ref='bar-chart'
                   class='sizeClass'
                   type='stacked'
                   :data='data'
                   :custom-options='options'>
        </bar-chart>
    </div>

</template>

<script lang='ts'>
import {defineComponent} from 'vue';
import ComChart from './ComChart.vue';
import BarChart from './BarChart.vue';
import {CustomOptions, Dataset} from './types';

export default defineComponent({
    name: 'chart-view',

    components: {BarChart, ComChart},

    setup(props, context) {
        function changeData() {
            console.log('Change Data');
        }

        function changeLabel() {
            console.log('Change label');
        }

        const items = [{key:20, key2:29},
            {key:20, key2:29},
            {key:20, key2:29},
            {key:20, key2:29}]

        const value =items.map(item=> item.key)

        const data: Array<Dataset> = [
            {
                label: 'chart test 1',
                value: [10, 30, 5, 11, 17, 23],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ]
            },
            {
                label: 'chart test 2',
                value: [-5, 10, 3, 2, 7, 9],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ]
            }
        ];

        const options = new CustomOptions();
        options.valueKey = 'value';
        options.labelKey = 'label';
        // options.backgroundColor = function(context) {
        //     const dataIndex = context.dataIndex;
        //     const index = dataIndex % 6;
        //     const colors = [
        //         'rgba(255, 99, 132, 0.2)',
        //         'rgba(54, 162, 235, 0.2)',
        //         'rgba(255, 206, 86, 0.2)',
        //         'rgba(75, 192, 192, 0.2)',
        //         'rgba(153, 102, 255, 0.2)',
        //         'rgba(255, 159, 64, 0.2)'
        //     ];
        //
        //     return colors[index];
        // };

        // options.borderColor = function(context) {
        //     const dataIndex = context.dataIndex;
        //     const index = dataIndex % 6;
        //     const colors = [
        //         'rgba(255, 99, 132, 1)',
        //         'rgba(54, 162, 235, 1)',
        //         'rgba(255, 206, 86, 1)',
        //         'rgba(75, 192, 192, 1)',
        //         'rgba(153, 102, 255, 1)',
        //         'rgba(255, 159, 64, 1)'
        //     ];
        //
        //     return colors[index];
        // };


        return {
            changeData,
            changeLabel,
            data,
            options
        };
    },
    methods: {
        update() {
            this.$refs['bar-chart'].update();
        }
    }
});
</script>

<style scoped>
    .sizeClass {
        width: 1800px;
        height: 600px;
    }
</style>