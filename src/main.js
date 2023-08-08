import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


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
import "ag-grid-community/styles/ag-theme-balham.css"

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(PerfectScrollbar)
app.provide('icons', icons)
app.component('CIcon', CIcon)
// AgGrid
app.component('AgGridVue', AgGridVue)
// datepicker
app.component('Datepicker', Datepicker)
// pagination
app.component('Paginate', Paginate)

app.mount('#app')