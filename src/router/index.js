import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
// import store from '../store';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/mbr/Login.vue'),
        meta: { unauthorized: true }
    },
    {
        path: '/register',
        name: '회원가입',
        component: () => import('@/views/pages/Register.vue'),
        meta: { unauthorized: true }
    },
    {
        path: '/',
        name: 'Home',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'Dashboard',
                component: () =>
                    import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
            },
            // {
            //     path: '/admin/mgr/info/mgrInfo',
            //     name: '운영자 관리',
            //     component: () => import('@/views/admin/mgr/info/mgrInfo.vue'),
            // },
            // {
            //     path: '/admin/mgr/info/mgrInfoDetail/:mode/:mngrSn?',
            //     name: '운영자 관리 상세',
            //     component: () => import('@/views/admin/mgr/info/mgrInfoDetail.vue'),
            // },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

// router.beforeEach(function(to, from, next){
//     const token = localStorage.getItem('token');
//     const nav = localStorage.getItem('nav');
//
//     if( to.matched.some(record => record.meta.unauthorized) ) {
//         return next();
//     }
//
//     if (token != null && token != '' && token != 'null' && token.accessToken != '') {
//         store.commit("SET_USER_DATA", JSON.parse(token));
//
//         if(nav != null && nav != '') {
//             store.commit("setMenuNav", JSON.parse(nav));
//
//             if(to.path == "/") {
//                 const navJson = JSON.parse(nav);
//
//                 if(navJson[1].to != null && navJson[1].to != ""){
//                     router.replace(navJson[1].to);
//                 } else if(navJson[1].items[0].to != null && navJson[1].items[0].to != ""){
//                     router.replace(navJson[1].items[0].to);
//                 }
//             }
//         } else if(store.state.menuNav.length == 0){
//             let go = null;
//             // if(to.path == "/admin") {
//             //     go = 'main';
//             // }
//             store.commit("loadMenuNav", go);
//         }
//
//         return next();
//     }else{
//         alert('로그인 해주세요');
//         return next('/login');
//     }
// });

export default router
