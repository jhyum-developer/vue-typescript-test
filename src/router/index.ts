import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
const pathList = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/about",
        name: "About"
    },
    {
        path: "/chart",
        name: "ChartView"
    },
    {
        path: "/breadcrumb",
        name: "Breadcrumb"
    }
] as Array<RouteRecordRaw>
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/chart",
        name: "ChartView",
        children: [
            {
                path: "/ComChartSample",
                name: "ComChartSample",
                component: () =>
                    import("../views/chart/sample/ComChartSample.vue")
            },
            {
                path: "/PointChartSample",
                name: "PointChartSample",
                component: () =>
                    import("../views/chart/sample/PointChartSample.vue")
            }
        ],
        component: () =>
            import("../views/chart/ChartView.vue")
    },
    {
        path: "/breadcrumb",
        name: "breadcrumb",
        component: () =>
            import("../views/breadcrumb/BreadcrumbView.vue")
    },
    {
        path: "/loadingBar",
        name: "loadingBar",
        component: () =>
            import("../views/loadingbar/LoadingBar.vue")
    },
    {
        path: "/virtualScroll",
        name: "VirtualScroll",
        component: () =>
            import("../views/scroll/VirtualScroll.vue")
    },
    {
        path: "/dragdrop",
        name: "DragDrop",
        component: () =>
            import("../views/dragdrop/DragDrop.vue")
    },
    {
        path: "/userSelectPopup",
        name: "UserSelectPopup",
        component: () =>
            import("../views/components/UserSelectPopup.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
});

export default router;
