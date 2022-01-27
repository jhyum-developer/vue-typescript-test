<template>
    <breadcrumb :path="path" @select-menu="change"></breadcrumb>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import Breadcrumb from '@/views/breadcrumb/Breadcrumb.vue';
import router from '@/router';

const component = defineComponent({
    name: 'breadcrumb-view',
    components: {Breadcrumb},
    props: {},

    setup(props, context) {
        let path = ref({});
        setTimeout(() => {
           path.value = {
               name: "test",
               path: "",
               code:  "",
               children: []
           };
        }, 1000)
        return {
            path
        };
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