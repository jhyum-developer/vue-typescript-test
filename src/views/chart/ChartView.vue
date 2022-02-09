<template>
    <div>
        <h1>Chart Test By Typescript</h1>
        <button @click="comChart">Common Chart</button>
        <button @click="pointChat">Point Chart</button>
        <router-view></router-view>
    </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import router from '@/router';

export default defineComponent({
    name: 'chart-view',

    methods: {
        comChart() {
            router.push({name:'ComChartSample'})
        },

        pointChat() {
            router.push({name:'PointChartSample'})
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