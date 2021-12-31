import Customers from "../components/Customers.vue";
import Me from "../components/Me.vue";
import customerDetail from "../components/CustomerDetail.vue";
import {
    createWebHistory,
    createRouter
} from 'vue-router'

const routes = [
    {
        path: "/",
        name: "",
        component: Customers
    },
    {
        path: "/customers",
        name: "customers",
        component: Customers
    },
    {
        path: "/me",
        name: "me",
        component: Me
    },
    {
        path: "/customerDetail",
        name: "customerDetail",
        component: customerDetail
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;