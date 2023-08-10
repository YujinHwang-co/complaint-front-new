<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                        ref="mbrId"
                        placeholder="ID(또는 Email)"
                        autocomplete="username"
                        v-model="this.mbrId"
                        @keyup.enter="this.onSubmit()"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                        ref="password"
                        type="password"
                        placeholder="비밀번호"
                        autocomplete="current-password"
                        v-model="this.password"
                        @keyup.enter="this.onSubmit()"
                    />
                  </CInputGroup>
                  <CRow class="justify-content-between">
                    <CCol style="align-self: end;">
                      <CFormCheck id="flexCheckDefault" label="아이디 저장" style="align-self: end; margin-bottom: 0px;"
                                  :checked="this.saveLoginID"
                                  @change="this.saveLoginID = $event.target.checked"/>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol :xs="6">
                      <CButton type="button" color="primary" class="px-4" @click="this.onSubmit()"> Login </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3" @click="this.register()"> Register Now! </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: 'Login',
  data() {
    return {
      mbrId: "",
      password: "",
      saveLoginID : false,
    }
  },
  methods: {
    onSubmit: function(){
      if( this.$filters.nvl(this.mbrId, "") == "" || this.$filters.nvl(this.password, "") == "" ){
        alert("ID, 비밀번호를 입력하세요.");
        return false;
      }

      store.dispatch("login", { params : { mbrId : this.mbrId, password : this.password } })
          .then((response) => {
            if( response.data.statusCode == 1 ){
              if( this.saveLoginID ){
                localStorage.setItem("adminSaveLoginID", this.mbrId);
              }else{
                localStorage.removeItem("adminSaveLoginID");
              }

              store.commit("loadMenuNav", 'main');
            }else{
              alert("로그인 실패 : " + response.data.statusMsg);
            }
          })
          .catch((error) => console.log(error));
    },
    register() {
      this.$router.push({name: "회원가입"});
    }
  },
  created() {
    if( localStorage.getItem('adminSaveLoginID') ) {
      this.mbrId = localStorage.getItem('adminSaveLoginID');
      this.saveLoginID = true;
    }
  }
}
</script>
