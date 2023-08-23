<template>
  <div>회원 관리 메뉴</div>

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
      :first-button-text="'≪'"
      :last-button-text="'≫'"
      :container-class="'pagination justify-content-center'"
      :page-class="'page-item'"
  />
</template>

<script>
/**
 * TODO: import API
 * import mbrInfoApi from "@/api/mbr/api_mbrInfo";
 */
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
        resizable: true,	// column 사이즈 조정 여부
        editable: true,	// 수정가능 여부
        sortable: true,		// 정렬순서 변경 여부
        suppressSizeToFit: true,	// 사이즈 조정부분 더블클릭 시 data 길이에 맞춤
      },

      columnDefs : [],
      listItem: [],


    }

  },
  methods: {
    onGridReady(params){
      this.gridApi = params.api;
    },
    onCellClicked(params) {
      if(params.column.colId == 'no') {
        console.log("params 확인", params.column.colId);
      }

    },
    getList: function(page) {
      if( this.$filters.nvl(page, "") != "" ){
        this.page = page;
      }

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
      { headerName: "전화번호"        , field: "mbtlnum"       , flex : 1		    , cellStyle : {"textAlign":"center"} },
      { headerName: "가입일시"        , field: "joinDt"        , flex : 1		    , cellStyle : {"textAlign":"center"}
        ,valueGetter: (params) => { return this.$filters.getStrDateTime(params.data.joinDt); }
      },
    ];
  },
}

</script>

<style>

</style>