<template>
    <div id="container" class="container">
        <div>Breadcrumb Test</div>
        <button id="clickButton" @click="move"> Button Click</button>
        <button @click="close"> Popup Close</button>
        <template v-for="(menu, index) in menuPath" :key="menu.path">
            <div class="menu" @click="displayChildren($event, menu, index)">{{ menu.name }}</div>
        </template>
    </div>

    <div v-if="display" ref="popup" id="popup" class="popup">
        <template v-for="menu in selectedMenu.children" :key="menu.path">
            <div class="sub-menu" @mousedown="select(menu)"> {{ menu.name }}</div>
        </template>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted, reactive, ref} from 'vue';
import menu from '../../data/breadcrumb-data.json';

type MenuType = {
    name: string;
    path: string;
    code: string;
    children: Array<MenuType> | never[];
};

const component = defineComponent({
    name: 'breadcrumb',

    props: {
        path: {
            type: Object,
            default: () => reactive({})
        },

        currentMenu: {
            type: Object,
            default: () => reactive({})
        }
    },

    setup(props, context) {
        const popup = ref();
        const display = ref(false);

        const menuPath: Array<MenuType> = reactive([menu]);
        let sMenu = menu;
        while (sMenu.children.length > 0) {
            menuPath.push(sMenu.children[0]);
            sMenu = sMenu.children[0];
        }
        let selectedMenu = sMenu;
        let selectedIndex = 0;

        onMounted(() => {
            const outsideClick = (event): void => {
                if (popup.value) {
                    const isOutsideClick = event.target !== popup.value;
                    if (isOutsideClick) display.value = false;
                }
            };
            window.addEventListener('mousedown', outsideClick);
            onUnmounted(() => {
                window.removeEventListener('mousedown', outsideClick);
            });

        });

        return {
            popup,
            display,
            menuPath,
            selectedMenu,
            selectedIndex
        };
    },

    methods: {
        move(target: HTMLElement): void {
            this.display = true;
            this.$nextTick(() => {
                const el = document.querySelector('#popup') as HTMLElement;
                if (el) {
                    const rect: DOMRect = target.getBoundingClientRect();
                    const left = rect.left;
                    const bottom = rect.bottom;

                    el.style.left = `${left}px`;
                    el.style.top = `${bottom}px`;
                }
            });
        },

        close() {
            if (this.popup) {
                this.display = false;
            }
        },

        moveRouter(target: MenuType) {
            this.$router.push({
                name: target.code
            });
        },

        displayChildren(event, target, index) {
            if (target.children.length === 0) return this.moveRouter(target);

            this.selectedMenu = target;
            this.selectedIndex = index;
            this.move(event.currentTarget);
            this.close();
        },

        select(target: MenuType) {
            this.menuPath.splice(this.selectedIndex + 1);
            this.menuPath.push(target);
            this.close();

            if (target.children.length === 0) {
                this.moveRouter(target);
            }
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

.menu {
    float: left;
    width: 100px;
    height: 40px;
    border: 1px solid black;
    margin-left: 10px;
}

.sub-menu {
    width: 100px;
    height: auto;
    border: 1px solid black;
    margin-top: 10px;
}
</style>