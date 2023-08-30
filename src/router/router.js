import { createRouter, createWebHistory } from "vue-router";
import Q1 from "../components/Q1/Q1.vue";
import Q2 from "../components/Q2/Q2.vue";
import Q3 from "../components/Q3/Q3.vue";
import Q4 from "../components/Q4/Q4.vue";

const routes = [
    { path: "/", component: Q1 },
    { path: "/q2", component: Q2 },
    { path: "/q3", component: Q3 },
    { path: "/q4", component: Q4 }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
