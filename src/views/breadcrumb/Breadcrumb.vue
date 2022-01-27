<template>
    <div id="container" class="container">
        <template v-for="(menu, index) in menuPath" :key="menu.path">
            <div class="menu" @click="viewSubMenu($event, menu, index)">{{ menu.name }}</div>
        </template>

        <div v-if="display" ref="popup" id="popup" class="popup">
            <template v-for="menu in selectedMenu.children" :key="menu.path">
                <div class="sub-menu" @click="select($event, menu)">{{ menu.name }}</div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, Ref, ref, watch} from 'vue';
import menu from '@/data/breadcrumb-data.json';

type MenuType = {
    name: string;
    path: string;
    code: string;
    children: Array<MenuType> | never[];
};

const component = defineComponent({
    name: 'breadcrumb',

    emits: ['selectMenu'],

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
        let instance = ref(getCurrentInstance());
        const popup = ref();
        const display = ref(false);
        let selectedIndex = ref(0);
        let selectedMenu: Ref<MenuType> = ref({} as MenuType);

        const menuPath: Array<MenuType> = reactive([menu]);
        let sMenu = menu;
        while (sMenu.children.length > 0) {
            menuPath.push(sMenu.children[0]);
            sMenu = sMenu.children[0];
        }
        selectedMenu.value = sMenu;

        const open = (target: HTMLElement): void => {
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

        const update = (path: MenuType) => {
            if(instance.value) {
                menuPath.splice(0, 0, path);
                instance.value.proxy?.$forceUpdate();
            }
        };

        const selectMenu = (target: MenuType) => {
            if (instance.value && target.children.length === 0) {
                instance.value.emit('selectMenu', target);
            }
        };

        const viewSubMenu = (event, target, index) => {
            if (target.children.length === 0) return selectMenu(target);

            selectedMenu.value = target;
            selectedIndex.value = index;
            open(event.currentTarget);
        };

        const select = (event, target: MenuType) => {
            menuPath.splice(selectedIndex.value + 1);
            menuPath.push(target);
            close();
            selectMenu(target);
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

        watch(() => props.path, (path) => {
            update(path as MenuType);
        });

        return {
            popup,
            display,
            menuPath,
            selectedMenu,
            selectedIndex,
            open,
            close,
            viewSubMenu,
            select
        };
    }
});

export default component;
</script>

<style scoped>
.container {
    display: inline-block;
    width: auto;
    height: auto;
    border: 1px solid black;
    padding: 5px;
}

.popup {
    position: absolute;
    width: auto;
    height: 100px;
    border: 1px solid red;
    overflow-y: auto;
}

.menu {
    display: inline-block;
    float: left;
    width: auto;
    height: auto;
    border: 1px solid black;
    padding: 5px;
}

.sub-menu {
    position: relative;
    width: 100px;
    height: auto;
    border: 1px solid black;
    margin-top: 10px;
}
</style>