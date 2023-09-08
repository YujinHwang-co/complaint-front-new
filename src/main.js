import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AppFilter from "@/components/AppFilter";

import CoreuiVue from '@coreui/vue'
import {PerfectScrollbar} from "vue3-perfect-scrollbar"
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import { iconsSet as icons } from '@/assets/icons'
import CIcon from '@coreui/icons-vue'

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Paginate from 'vuejs-paginate-next'

import {AgGridVue} from "ag-grid-vue3"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"

// 다음 주소검색 component
import DaumAddr from '@/components/common/DaumAddr.vue'
// 네이버 지도
import {NaverMap} from "vue3-naver-maps";

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(PerfectScrollbar)
// 네이버 지도
app.use(NaverMap, {clientId: 'mjeol7mns5', subModules:'geocoder'})
app.provide('icons', icons)
app.component('CIcon', CIcon)
// AgGrid
app.component('AgGridVue', AgGridVue)
// datepicker
app.component('Datepicker', Datepicker)
// pagination
app.component('Paginate', Paginate)
// 다음 주소 검색
app.component('DaumAddr', DaumAddr)

app.config.globalProperties.$filters = AppFilter
app.mount('#app')