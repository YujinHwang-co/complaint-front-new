<template>
  <CSidebar position="fixed"
            :unfoldable="sidebarUnfoldable"
            :visible="sidebarVisible"
            @visible-change="(event) =>
                $store.commit({
                  type: 'updateSidebarVisible',
                  value: event,
                })"
  >
    <CSidebarBrand>
      <CIcon custom-class-name="sidebar-brand-full" :icon="logoNegative" :height="35" />
      <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="35" />
    </CSidebarBrand>

    <CSidebarBrand style="justify-content:unset;">
      <CRow class="mb-3 justify-content-md-center" style="flex:1;">
        <p class="d-grid gap-2 d-md-flex justify-content-md-center">{{this.$store.state.mbrNm}}</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
          <CButton size="sm" color="secondary" @click="this.myInfo">정보수정</CButton>
          <CButton size="sm" color="secondary" @click="this.logout">로그아웃</CButton>
        </div>
      </CRow>
    </CSidebarBrand>
    <!-- sidebar 추가 개발하기-->
    <CSidebarNav>
      <li class="nav-title">Complaint</li>
      <CNavItem href="/">
        <CIcon  customClassName="nav-icon" icon="cil-speedometer"/>
        Dashboard
      </CNavItem>
      <CNavItem href="#">
        <CIcon  customClassName="nav-icon" icon="cil-speedometer"/>
        With badge
        <CBadge color="primary ms-auto">Badge</CBadge>
      </CNavItem>
      <CNavGroup>
        <template #togglerContent>
          <CIcon  customClassName="nav-icon" icon="cil-settings"/> Nav dropdown
        </template>
        <CNavItem href="#">
          <CIcon  customClassName="nav-icon" icon="cil-settings"/> Nav dropdown item
        </CNavItem>
        <CNavItem href="#">
          Nav dropdown item
        </CNavItem>
      </CNavGroup>
    </CSidebarNav>

    <perfect-scrollbar style="margin-bottom:50px;">
      <AppSidebarNav />
    </perfect-scrollbar>

    <CSidebarToggler class="d-none d-lg-flex" style="position:fixed;bottom:0;" @click="$store.commit('toggleSidebar')" />
    <!-- <CSidebarToggler class="d-none d-lg-flex" @click="$store.commit('toggleUnfoldable')" /> -->
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
import { logoNegative } from '@/assets/brand/logo-negative'
import { sygnet } from '@/assets/brand/sygnet'
import store from "@/store";
import {CNavItem} from "@coreui/vue/dist/components/nav";

export default {
  name: 'AppSidebar',
  components: {
    CNavItem,
    AppSidebarNav,
  },
  methods: {
    logout() {
      store.commit("SET_USER_DATA", null);
      this.$router.push({name: "Login"});
    },
    myInfo() {
      this.$router.push({name: "정보수정"});
    },
  },
  created(){
    // console.log(this.$store.state);
  },
  setup() {
    const store = useStore()
    return {
      logoNegative,
      sygnet,
      sidebarUnfoldable: computed(() => store.state.sidebarUnfoldable),
      sidebarVisible: computed(() => store.state.sidebarVisible),
    }
  },
}
</script>
