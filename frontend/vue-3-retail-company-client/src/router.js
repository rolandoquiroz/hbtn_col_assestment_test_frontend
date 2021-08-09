import { createWebHistory, createRouter } from "vue-router";

import Login from "./components/Login.vue";


// lazy-loaded

const UsersAll = () => import("./components/UsersAll")
const UserId = () => import("./components/UserId")
const AddUser = () => import("./components/AddUser")

const routes =  [
    {
        path: "/",
        name: "get-users-all",
        component: UsersAll
    },
    {
        path: "/home",
        name: "get-users-all",
        component: UsersAll
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
    {
        path: "/api/v1/users/:id/",
        name: "get-user-id",
        // lazy-loaded
        component: UserId
    },
    {
        path: "/api/v1/users/",
        name: "post-user",
        // lazy-loaded
        component: AddUser
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
