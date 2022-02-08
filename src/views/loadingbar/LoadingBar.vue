<template>
    <button @click="move"> Start Loading Bar</button>
    <button @click="stop"> End Loading Bar</button>
    <button @click="open"> Vx Popup Open</button>

    <div class="circle-wrap">
        <div class="circle">
            <div class="mask half">
                <div class="fill"></div>
            </div>
            <div class="inside-circle">loading</div>
        </div>
    </div>

    <label>File Downloading...</label>
    <progress max="100" value="30"> 30%</progress>

</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

const component = defineComponent({
    name: 'loading-bar',

    props: {},

    setup(props, context) {
        const move = (): void => {
            ;
        };
        const stop = (): void => {
            ;
        };

        const promise = new Promise(resolve => {
            resolve('')
        })

        const test = ref();

        const popupTest = ref();

        let open = () => {
            popupTest.value.open();
            console.log(popupTest);
        };

        return {
            move,
            stop,
            popupTest,
            open
        };
    }
});

export default component;
</script>

<style scoped>

body {
    font-family: "Roboto", sans-serif;
    background: #d2eaf1;
}

.circle-wrap {
    margin: 150px auto;
    width: 150px;
    height: 150px;
    background: #fefcff;
    border-radius: 50%;
    border: 1px solid #cdcbd0;
}

.circle-wrap .circle .mask,
.circle-wrap .circle .fill {
    width: 150px;
    height: 150px;
    position: absolute;
    border-radius: 50%;
}

.mask .fill {
    clip: rect(55px, 45px, 75px, 0px);
    background-color: #227ded;
}

.circle-wrap .circle. mask {
    clip: rect(0px, 150px, 150px, 75px);
}

.mask .fill,
.circle .fill {
    animation: fill infinite 1s;
    transform: rotate(360deg);
}

@keyframes fill {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.circle-wrap .inside-circle {
    width: 122px;
    height: 122px;
    border-radius: 50%;
    background: #d2eaf1;
    line-height: 120px;
    text-align: center;
    margin-top: 14px;
    margin-left: 14px;
    color: #1e51dc;
    position: absolute;
    z-index: 100;
    font-weight: 700;
    font-size: 25px;
}
</style>