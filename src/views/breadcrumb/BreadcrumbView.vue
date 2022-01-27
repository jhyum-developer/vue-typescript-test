<template>
    <breadcrumb @select-menu="change"></breadcrumb>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Breadcrumb from '@/views/breadcrumb/Breadcrumb.vue';
import router from '@/router';

const component = defineComponent({
    name: 'breadcrumb-view',
    components: {Breadcrumb},
    props: {},

    setup(props, context) {
        ;
    },
    methods: {
        change(menu) {
            router.push({
                name: menu.code
            })
        }
    }
});

export default component;
</script>

<style scoped>

</style>