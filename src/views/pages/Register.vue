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
                    <CIcon icon="cil-cursor" />
                  </CInputGroupText>
                  <CFormInput v-model="this.regiItem.mbrId" placeholder="ID"/>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput v-model="this.regiItem.mbrNm" placeholder="Username"/>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user-follow" />
                  </CInputGroupText>
                  <CFormInput v-model="this.regiItem.mbtlnum" placeholder="Phone Number"/>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CButton class="col-sm-1" color="dark" style="width:15%;" type="button" @click="() => { this.daumAddrDlg = true }">주소 찾기</CButton>
                  <CFormInput v-model="this.regiItem.zip" placeholder="우편번호" readOnly required type="text"/>
                  <div class="col-sm-1" style="width:65%;">
                    <CFormInput v-model="this.regiItem.addr" placeholder="주소" readOnly required type="text"/>
                  </div>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CFormInput v-model="this.regiItem.addrDetail" placeholder="상세주소" type="text"/>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput v-model="this.regiItem.password" type="password" placeholder="Password"/>
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput v-model="this.regiItem.passwordChk" type="password" placeholder="Repeat password"/>
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
    <!-- 주소 검색 컴포넌트 -->
    <CModal alignment="center" :visible="this.daumAddrDlg" @close="() => { this.daumAddrDlg = false }">
      <CModalHeader>
        <CModalTitle>주소 검색</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <DaumAddr @callback="this.addrCallback" />
      </CModalBody>
    </CModal>
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
      daumAddrDlg: false,

    }

  },
  methods: {
    // 저장할 데이터 parameter
    setSaveParams: function() {
      let formData = new FormData();

      formData.append("mbrId", this.regiItem.mbrId);
      formData.append("mbrNm", this.regiItem.mbrNm);
      formData.append("mbtlnum", this.regiItem.mbtlnum);
      formData.append("zip", this.regiItem.zip);
      formData.append("addr", this.regiItem.addr);
      formData.append("addrDetail", this.regiItem.addrDetail);
      formData.append("password", this.regiItem.password);

      return formData;
    },
    // insert(register) member
    insertMbrInfo: function () {
      if( !this.validationChk() ){
        return false;
      }

      mbrInfoApi.insertMbrInfo(this.setSaveParams())
        .then((response) => {
          if (response.data.statusCode == 1) {
            alert("회원가입이 정상적으로 처리되었습니다.");
            window.history.pushState(null, null, null);
            this.$router.push({name: "Login"});
          } else {
            alert(response.data.statusMsg);
            return false;
          }
        })
        .catch((error) => console.log(error));
    },
    // validation 체크
    validationChk: function() {
      let chkBool = true;

      if(this.$filters.nvl(this.regiItem.mbrId, "") == "") {
        alert("회원ID를 입력해주세요.");
        return !chkBool;
      }
      if(this.$filters.nvl(this.regiItem.mbrNm, "") == "") {
        alert("회원 이름을 입력해주세요.");
        return !chkBool;
      }
      if(!this.$filters.getTelNumValidation(this.regiItem.mbtlnum)) {
        alert("전화번호 형식이 옳바르지 않습니다.\n확인 후 재입력 해주세요.");
        return !chkBool;
      }
      if(this.$filters.nvl(this.regiItem.password, "") == "") {
        alert("비밀번호를 입력해주세요.");
        return !chkBool;
      }
      if(this.regiItem.password != this.regiItem.passwordChk) {
        alert("입력한 비밀번호가 다릅니다.")
        return !chkBool;
      }

      return chkBool;

    },
    // 주소 검색 후 callback 함수
    addrCallback: function (data) {
      this.regiItem.zip = data.zonecode;
      this.regiItem.addr = data.address;
      this.daumAddrDlg = false;
    },
  },
  created() {

  },
  beforeMount() {

  },

}
</script>
