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
            offsetY: 0
        };
    },

    setup(props, context) {
        const dummy:Array<Record<string, string>> = [];
        for(let i =0; i<100;i++) {
            dummy.push({label:`item index ${i}`})
        }

        const paddingIndex = 2;
        const contentSize = 10;
        let startIndex = ref(0);
        const endIndex = computed(() => startIndex.value + 2 * paddingIndex + contentSize);
        const displayList = computed({
            get: () => {
                return dummy.slice(startIndex.value, endIndex.value);
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
            startIndex
        };
    },

    methods: {
        onScroll() {
            const paddingIndex = 2;
            // content Height(30px) + 2 * border(1px, top & bottom)
            const contentHeight = 32;
            const paddingScrollTop = paddingIndex * contentHeight;
            // scroll container Element => viewPort Element
            const scrollContainer = this.$refs.scrollContainer as HTMLElement;
            // scroll container scrollTop => viewPort Element Scroll Top
            const scrollTop = scrollContainer.scrollTop;
            this.startIndex = scrollTop > paddingScrollTop?
                Math.round((scrollTop - paddingScrollTop)/contentHeight) : 0;
            // 시작 index 가 padding index 보다 클 경우 시작 index 만큼 offset
            this.offsetY = scrollTop > paddingScrollTop? this.startIndex * 32: 0;
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
    display: inline-block;
    height: auto;
}
</style>