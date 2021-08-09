import { createWebHistory, createRouter } from "vue-router";

import Home from "./components/Home.vue";
import Login from "./components/Login.vue";


// lazy-loaded

const UsersAll = () => import("./components/UsersAll")


const routes =  [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/api/v1/users/all/",
        name: "get-users-all",
          // lazy-loaded
        component: UsersAll
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
    if (authRequired && !loggedIn) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
