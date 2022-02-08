<template>
    <div>
        <h1>Chart Test By Typescript</h1>
        <button @click="linbar">Line Bar Chart</button>
        <button @click="comChart">Common Chart</button>
        <button @click="pointChat">Point Chart</button>
<!--        <button @click="update">update button</button>-->
<!--        <button @click="resetZoom">Reset Zoom</button>-->
<!--        <button @click="zoom">Reset +</button>-->
        <router-view></router-view>
        <com-chart ref="com-chart"
                   v-if="false"
                   class="sizeClass"
                   :data="data"
                   :labels="xLabels"
                   :label-keys='["test 1", "test 2", "test 3"]'
                   chart-type="bar"
                   :options="options">
        </com-chart>

        <line-bar-chart ref="lineBarChart"
                        v-if="false"
                        class="sizeClass"
                        :data="data"
                        :options="options"
                        zoom>
        </line-bar-chart>
    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from 'vue';
import ComChart from './ComChart.vue';
import {DefineComponent} from '@vue/runtime-core';
import {Point, ScriptableContext} from 'chart.js';
import {Dataset} from '@/views/chart/utils';
import LineBarChart from '@/views/chart/LineBarChart.vue';
import router from '@/router';

type func = (...age:any[])=> void;

type test = {
    type: string;
    valueKeys: Array<string | Point>;
    items: Array<number | Record<string, unknown>>;
    labelKeys:Array<string> | func;
    stacked: boolean;
}

export default defineComponent({
    name: 'chart-view',

    components: {LineBarChart, ComChart},

    setup(props, context) {





        function changeData() {
            console.log('Change Data');
        }

        function changeLabel() {
            console.log('Change label');
        }

        const items: Array<number[] | Record<string, unknown>> = [
            {key: 5, key2: 29, key3: 10},
            {key: 10, key2: 9, key3: 8},
            {key: 3, key2: 6, key3: 4},
            {key: 17, key2: 5, key3: 11},
            {key: 7, key2: 14, key3: 23}
        ];

        const nItems = [
            [1, 2, 3, 4, 5, 6, 7],
            [11, 6, 3, 14, 5, 8, 2],
            [8, 2, 23, 4, 15, 6, 14]
        ];

        const xLabels = ['x label 1', 'x label 2', 'x label 3', 'x label 4', 'x label 5', 'x label 6', 'x label 7'];

        const valueKeys = ['key', 'key2', 'key3'];
        const pointKeys = [
            {x: 'key3', y: 'key'},
            {x: 'key', y: 'key2'},
            {x: 'key2', y: 'key3'}
        ];

        const data = reactive(new Dataset(valueKeys, nItems));
        const nData = reactive(new Dataset(valueKeys, []));
        const test = new Dataset();

        function itemsPromise() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    return resolve(items);
                }, 1000);
            });
        }

        async function aysnItems() {
            try {
                await itemsPromise().then(result => {
                    data.items = result as Array<number[] | Record<string, unknown>>;
                    nData.items = nItems;
                });
            } catch (error) {
                console.log(error);
            }

        }

        onMounted(() => {
            aysnItems();
        });

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
            changeData,
            changeLabel,
            options,
            items,
            xLabels,
            valueKeys,
            data,
            nData
        };
    },
    methods: {
        linbar() {
            router.push({name:'LineBarChartSample'})
        },

        comChart() {
            router.push({name:'ComChartSample'})
        },

        pointChat() {
            router.push({name:'PointChartSample'})
        },

        update() {
            const component = this.$refs['com-chart'] as DefineComponent;
            component.update();
            // const lineBar = this.$refs['lineBarChart'] as DefineComponent;
            // lineBar.update();
        },

        resetZoom() {
            const component = this.$refs['com-chart'] as DefineComponent;
            component.resetZoom();
            // const lineBar = this.$refs['lineBarChart'] as DefineComponent;
            // lineBar.resetZoom();
        },

        zoom() {
            const component = this.$refs['com-chart'] as DefineComponent;
            component.chart.zoom(0.9);
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