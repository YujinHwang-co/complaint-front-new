<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="Username" autocomplete="username" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="Email" autocomplete="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput v-model="this.regiItem.password"
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="success" @click="this.insertMbrInfo">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
// api import
import mbrInfoApi from "@/api/mbr/api_mbrInfo";
export default {
  name: 'Register',
  data() {
    return {
      regiItem: {},

    }

  },
  methods: {
    // 저장할 데이터 parameter
    setSaveParams: function() {
      let formData = new FormData();

      formData.append("mbrId", this.regiItem.mbrId);

      return formData;
    },
    // insert(register) member
    insertMbrInfo: function () {
      alert("1234");
      mbrInfoApi.insertMbrInfo(this.setSaveParams())
        .then((response) => {
          if (response.data.statusCode == 1) {
            window.history.pushState(null, null, null);
          } else {
            alert(response.data.statusMsg);
            return false;
          }
        })
        .catch((error) => console.log(error));
    },
  },
  created() {

  },
  beforeMount() {

  },

}
</script>
