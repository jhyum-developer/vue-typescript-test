<template>
    <div id="container" class="container">
        <div>Breadcrumb Test</div>
        <template v-for="(menu, index) in menuPath" :key="menu.path">
            <div class="menu" @click="displayChildren($event, menu, index)">{{ menu.name }}</div>
        </template>

        <div v-if="display" ref="popup" id="popup" class="popup">
        <template v-for="menu in selectedMenu.children" :key="menu.path">
                <div class="sub-menu" @click="select(menu)">{{ menu.name }}</div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, onUnmounted, reactive, ref} from 'vue';
import menu from '../../data/breadcrumb-data.json';
import router from '@/router';

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
        let selectedMenu = ref({
            name: '',
            path: '',
            code: '',
            children: []
        } as MenuType);
        let selectedIndex = ref(0);

        const menuPath: Array<MenuType> = reactive([menu]);
        let sMenu = menu;
        while (sMenu.children.length > 0) {
            menuPath.push(sMenu.children[0]);
            sMenu = sMenu.children[0];
        }
        selectedMenu.value = sMenu;

        const move = (target: HTMLElement): void => {
            display.value = true;
            nextTick(() => {
                const el = document.querySelector('#popup') as HTMLElement;
                if (el) {
                    const rect: DOMRect = target.getBoundingClientRect();
                    const left = rect.left;
                    const bottom = rect.bottom;

                    el.style.left = `${left}px`;
                    el.style.top = `${bottom}px`;
                }
            });
        };

        const close = () => {
            if (popup.value) {
                display.value = false;
            }
        };

        const moveRouter = (target: MenuType) => {
            router.push({
                name: target.code
            });
        };

        const displayChildren = (event, target, index) => {
            if (target.children.length === 0) return moveRouter(target);

            selectedMenu.value = target;
            selectedIndex.value = index;
            move(event.currentTarget);
        };

        const select = (target: MenuType) => {
            menuPath.splice(selectedIndex.value + 1);
            menuPath.push(target);
            close();

            if (target.children.length === 0) {
                moveRouter(target);
            }
        };

        onMounted(() => {
            const outsideClick = (event): void => {
                if (popup.value) {
                    const isOutsideClick = event.target.parentElement !== popup.value;
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
            selectedIndex,
            move,
            close,
            moveRouter,
            displayChildren,
            select
        };
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