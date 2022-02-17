<template>
    <div class="container">
        <div class="origin">
            <div id="draggable-1"
                 class="draggable"
                 draggable="true"
                 @dragstart="dragStart">Draggable
            </div>
        </div>
        <div class="dropzone"
             @dragover="dragOver"
             @drop="drop">Drop Zone
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
const component = defineComponent({
    name: 'DragDrop',

    props: {},

    setup(props, context) {
        ;
    },

    methods: {
        dragStart(event) {
            event.dataTransfer.setData('text/plain', event.target.id);

            event.currentTarget.style.backgroundColor = 'yellow';

        },
        dragOver(event) {
            event.preventDefault();
        },
        drop(event) {
            const id = event.dataTransfer.getData('text');
            const draggableEl = document.getElementById(id);
            const dropZone = event.target;
            dropZone.appendChild(draggableEl);

            event.dataTransfer.clearData();
        }
    }
});

export default component;
</script>

<style scoped>
.container {
    border: 2px solid #DFA612;
    color: black;
    display: flex;
    font-family: sans-serif;
    font-weight: bold;
}
.origin {
    flex-basis: 100%;
    flex-grow: 1;
    padding: 10px;
}
.draggable {
    background-color: #4AAE9B;
    font-weight: normal;
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 10px;
}
.dropzone {
    background-color: #6DB65B;
    flex-basis: 100%;
    flex-grow: 1;
    padding: 10px;
}
</style>