<template>
  <CRow class="mb-3">
    <CCard>
      <CCardHeader>
        <strong>회원 조회</strong>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <div class="col-2">
            <CFormSelect v-model="this.searchKey">
              <option value="mbrId">회원 ID</option>
              <option value="mbrNm">회원 명</option>
              <option value="mbtlnum">전화번호</option>
            </CFormSelect>
          </div>
          <div class="col-9">
            <CFormInput type="text" v-model="this.searchValue" @keyup.enter="this.getList(1)" />
          </div>
          <div class="col-1">
            <CButton type="button" color="dark" @click="this.getList(1)">조회</CButton>
          </div>
        </CRow>
      </CCardBody>
    </CCard>
  </CRow>
  <CRow class="mb-3">
    <CCard>
      <CCardHeader>
        <strong>회원 목록</strong>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CFormLabel for="staticEmail"><b>총 {{this.pageable.totalElements}} 건이 조회되었습니다.</b></CFormLabel>
        </CRow>
        <ag-grid-vue
            style="width: 100%;"
            class="ag-theme-alpine"
            readOnlyEdit="true"
            @grid-ready="this.onGridReady"
            @cell-clicked="this.onCellClicked"
            :defaultColDef="this.defaultColDef"
            :columnDefs="this.columnDefs"
            :rowData="this.listItem"
            domLayout="autoHeight"
        />
        <br>
        <paginate
            v-model="this.page"
            :page-count="this.pageable.totalPages"
            :page-range="10"
            :margin-pages="0"
            :click-handler="this.getList"
            :prev-text="'＜'"
            :next-text="'＞'"
            :first-last-button=true
            :first-button-text="'prev'"
            :last-button-text="'next'"
            :container-class="'pagination justify-content-center'"
            :page-class="'page-item'"
        />
      </CCardBody>
    </CCard>
  </CRow>
</template>

<script>
import mbrInfoApi from "@/api/mbr/api_mbrInfo";
export default {
  name: 'mngMbr',
  data() {
    return {
      page : 1,
      pageable : {
        totalElements : 0,
        totalPages : 1,
      },

      gridApi : null,
      defaultColDef: {
        resizable: true,
        editable: true,
        sortable: true,
        suppressSizeToFit: true
      },

      searchKey: "mbrId",
      searchValue: null,

      columnDefs : [],
      listItem: [],
    }

  },
  methods: {
    onGridReady(params){
      this.gridApi = params.api;
    },
    onCellClicked(params) {
      /**
       * TODO: cell click -> detail 화면 보여지게
       * */
      if(params.column.colId == 'no') {
        console.log("params 확인", params.data.mbrSeq);
      }
    },
    searchParams: function() {
      let params = {
        page : this.page,
      };
      if( this.$filters.nvl(this.searchKey, "") != "" ){
        params.searchKey = this.searchKey;
      }
      if( this.$filters.nvl(this.searchValue, "") != "" ){
        params.searchValue = this.searchValue;
      }
      return params;
    },
    // 회원 목록을 가져오는 list
    getList: function(page) {
      if( this.$filters.nvl(page, "") != "" ){
        this.page = page;
      }
      mbrInfoApi.listMbrInfo({params : this.searchParams()})
          .then((response) => {
            if(response.data) {
              this.listItem = response.data.data.content;
              this.pageable = {
                totalElements: response.data.data.totalElements,
                totalPages: response.data.data.totalPages
              };
            }else {
              alert(response.data.statusMessage)

            }
          }).catch((error) => console.log(error));
    },
  },
  created() {
    this.getList(1);
  },
  beforeMount() {
    this.columnDefs = [
      { headerName: 'No'             ,field: "no" , width: 80, sortable: false	, cellStyle: {'color': 'blue','text-decoration': 'underline','cursor': 'pointer', 'text-align':'center'}
        , valueGetter: (params) => { return this.$filters.setComma(this.pageable.totalElements - params.node.rowIndex - ((this.page-1) * (this.$store.state.pageSize))) }
      },
      { headerName: "회원 ID"         , field: "mbrId"         , flex : 1		    , cellStyle : {"textAlign":"center"} },
      { headerName: "회원 명"         , field: "mbrNm"         , flex : 1		    , cellStyle : {"textAlign":"center"} },
      { headerName: "전화번호"        , field: "mbtlnum"       , flex : 1		    , cellStyle : {"textAlign":"center"}
        , valueGetter: (params) => { return this.$filters.setHyphenPhone(params.data.mbtlnum); }
      },
      { headerName: "가입일시"        , field: "joinDt"        , flex : 1		    , cellStyle : {"textAlign":"center"}
        ,valueGetter: (params) => { return this.$filters.getStrDateTime(params.data.joinDt); }
      },
    ];
  },
}

</script>

<style>

</style>