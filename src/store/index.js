import { createStore } from 'vuex'
import axios from '../api/index';
import router from '@/router'

export default createStore({
    state: {
        sidebarVisible: '',
        sidebarUnfoldable: false,
        menuNav : [],
        token: null,
        pageSize: 15,
        // mbrSn: 0,
        // mbrId: '',
        // mbrNm: '',
    },
    mutations: {
        toggleSidebar(state) {
            state.sidebarVisible = !state.sidebarVisible
        },
        toggleUnfoldable(state) {
            state.sidebarUnfoldable = !state.sidebarUnfoldable
        },
        updateSidebarVisible(state, payload) {
            state.sidebarVisible = payload.value
        },
        setMenuNav(state, nav) {
            if(state.menuNav != nav) {
                state.menuNav = nav;
                if (nav != null && nav != '') {
                    localStorage.setItem('nav', JSON.stringify(nav));
                }
            }
        },
        loadMenuNav(state, go) {
            let homePath = '/';

            axios.get('/api/listMgrMenuMngByMenuTreeByAuthor')
                .then((response) => {
                    // console.log(response);
                    const list = response.data.data.content;
                    let newNav = [ { component: 'CNavTitle', name: 'complaint'} ];
                    let upMenuNo = 0;

                    for (let i = 0; i < list.length; i++) {
                        // console.log(i, " - homePath ==> ", homePath);
                        const upMenuMngData = list[i]
                        if(upMenuMngData.menuSn == 0) {
                            let navItem = { name: upMenuMngData.menuNm, to: upMenuMngData.menuUrl, icon: JSON.parse(upMenuMngData.dtlInfo)?.menuIcon }

                            if(upMenuMngData.menuUrl == '') {
                                navItem['component'] = 'CNavGroup';
                                navItem['items'] = [];
                            } else {
                                navItem['component'] = 'CNavItem';
                            }

                            newNav.push(navItem);
                            upMenuNo++;
                            if(homePath == '/' && upMenuMngData.menuUrl != '') {
                                homePath = upMenuMngData.menuUrl
                            }
                        } else {
                            newNav[upMenuNo].items.push(
                                {
                                    component: 'CNavItem',
                                    name: upMenuMngData.menuNm,
                                    to: upMenuMngData.menuUrl,
                                }
                            )

                            if(homePath == '/' && upMenuMngData.menuUrl != '') {
                                homePath = upMenuMngData.menuUrl
                            }
                        }
                    }

                    state.menuNav = newNav
                    localStorage.setItem('nav', JSON.stringify(newNav));
                    if(go != null && go == 'main') {
                        router.push(homePath);
                    }
                })
                .catch((error) => console.log(error));
        },
        SET_USER_DATA(state, userData) {
            if(state.token != userData) {
                state.token = userData;
                if (userData != null && userData != '') {
                    localStorage.setItem('token', JSON.stringify(userData));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.accessToken}`;

                    const parseJwt = (token) => {
                        try {
                            return JSON.parse(atob(token.split('.')[1]));
                        } catch (e) {
                            return null;
                        }
                    };

                    const playload = parseJwt(userData.accessToken);
                    // console.log("playload ==> ", playload);
                    state.mbrSn = playload.mbrSn;
                    state.mbrNm = decodeURIComponent(playload.mbrNm);
                    state.mbrId = playload.sub;
                } else {
                    localStorage.removeItem('token');
                    axios.defaults.headers.common['Authorization'] = '';
                }
            }
        },
    },
    actions: {
        login({ commit }, credentials) {
            return axios
                .post("/api/admin/login", null, credentials)
                .then(res => {
                    if(res.status == 200 && res.data.statusCode == '1') {
                        commit("SET_USER_DATA", res.data.data);
                    }
                    return res;
                })
                ;
        },
        logout({ commit }, credentials) {
            return axios
                .post("/api/logout", null, credentials)
                .then(res => {
                    if(res.status == 200) {
                        commit("SET_USER_DATA", null);
                        this.$router.push({name: "Login"});
                    }
                });
        },
    },
    modules: {},
})
