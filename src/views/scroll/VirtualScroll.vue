<template>
    <div ref="scrollContainer" class="scroll-container" @scroll="onScroll">
        <div ref="virtualContent">
            <div ref="contentContainer" class="content-container" :style="{'transform': `translateY(${offsetY}px)`}">
                <template v-for="(item, index) in displayList" :key="index">
                    <div class="scroll-content" >{{item.label}}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref, watch} from 'vue';

const component = defineComponent({
    name: 'VirtualScroll',

    props: {},

    data() {
        return {
            offsetY: 0,
            tempScrollTop: 0,
        }
    },

    setup(props, context) {
        const dummy:Array<Record<string, string>> = [];
        for(let i =0; i<100;i++) {
            dummy.push({label:`item index ${i}`})
        }

        let startIndex = ref(0);
        let deltaIndex = ref(0);
        const displayList = computed({
            get: () => {
                return dummy.slice(startIndex.value, startIndex.value + 14);
            },
            set: () => {;}
        });

        const virtualContent = ref();
        onMounted(() => {
            virtualContent.value.style.height = `${30 * 100}px`;
        });

        return {
            displayList,
            virtualContent,
            startIndex,
            deltaIndex
        };
    },

    methods: {
        onScroll() {
            const scrollContainer = this.$refs.scrollContainer as HTMLElement;
            const scrollTop = scrollContainer.scrollTop;
            this.startIndex = Math.round(scrollTop/30);
            this.offsetY = scrollTop;
            this.tempScrollTop = scrollTop;

        }
    }
});

export default component;
</script>

<style scoped>
.scroll-container {
    width: 120px;
    height: 320px;
    overflow-y: auto;
}
.scroll-content {
    width: 100px;
    height: 30px;
    border: 1px solid black;
}
.content-container {
    height: 320px;
}
</style>