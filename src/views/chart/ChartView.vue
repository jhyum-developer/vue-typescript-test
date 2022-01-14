<template>
    <div>
        <h1>Chart Test By Typescript</h1>
        <button @click="changeData">data button</button>
        <button @click="changeLabel">label button</button>
        <com-chart :data='data' :label='label'></com-chart>
    </div>

</template>

<script>
import {defineComponent} from 'vue';
import ComChart from './ComChart';

export default defineComponent({
    name: 'chart-view',

    components: {ComChart},

    data() {
        return {
            data: ['test'],
            label: 'label test'
        }
    },

    methods: {
        changeData() {
            this.data = 'Change Data';
        },

        changeLabel() {
            this.label = 'Change label';

        }
    }
});
</script>

<style scoped>

</style>