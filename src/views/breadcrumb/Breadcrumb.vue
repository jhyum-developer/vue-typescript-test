<template>
    <div id='container' class='container'>
        <div>Breadcrumb Test</div>
        <button id='clickButton' @click='move'> Button Click</button>
        <button @click='close'> Popup Close</button>
    </div>

    <div v-if='display' ref='popup' id='popup' class='popup'>
        <div>Popup</div>
        <template v-for='num in 10' :key='num'>
            <div class='popupContent' @click='select(num)'> Popup Content {{num}}</div>
        </template>
    </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, ref, watch} from 'vue';

const component = defineComponent({
    name: 'breadcrumb',

    props: {
        path: {
            type: Object,
            default: () => reactive({})
        }
    },

    setup(props, context) {
        const popup = ref();
        const display = ref(false);
        console.log(`init ${popup.value}`);
        watch(() => popup, () => console.log(`change ${popup.value}`), {deep: true})

        return {
            popup,
            display
        };
    },

    methods: {
        move(): void {
            this.display = true;
            this.$nextTick(() => {
                const target = document.querySelector("#clickButton") as HTMLElement;
                const el = document.querySelector('#popup') as HTMLElement;
                if(el) {
                    const rect: DOMRect = target.getBoundingClientRect();
                    const left = rect.left;
                    const bottom = rect.bottom;

                    // el.style.display = 'block';
                    el.style.left = `${left}px`;
                    el.style.top = `${bottom}px`;
                }
            })
        },

        close() {
            if(this.popup) {
                // const popup = this.popup as HTMLElement;
                // popup.style.display = 'none';
                this.display = false;
            }
        },

        select(target) {
            console.log(`select ${target}`);
            this.close();
        }
    }
});

export default component;
</script>

<style scoped>
.container {
    width: 1200px;
    height: 600px;
    border: 1px solid black;
}

.popup {
    position: absolute;
    /*display: none;*/
    width: auto;
    height: 100px;
    border: 1px solid red;
    overflow-y: auto;
}
.popupContent {
    margin-top: 5px;
}
</style>