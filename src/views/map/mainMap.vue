<template>
  <div>메인지도 메뉴</div>
  <naver-map style="width: 100%; height: 600px" :mapOptions="mapOptions">
    <naver-marker
        :latitude="37.485266"
        :longitude="126.901401"
        @onLoad="onLoadMarker($event)"
    >
    </naver-marker>
    <naver-info-window
        :marker="marker"
        :open=true
        @onLoad="onLoadInfoWindow($event)"
    >
      <div class="infowindow-style">click Marker!</div>
    </naver-info-window>
  </naver-map>
</template>

<script>
import {NaverMap, NaverMarker, NaverInfoWindow} from "vue3-naver-maps";
export default {
  name: 'mainMap',
  components: {NaverMap, NaverMarker, NaverInfoWindow},
  data() {
    return {
      map: null,
      marker: null,
      mapOptions: {
        latitude: 37.485266, // 지도 중앙 위도
        longitude: 126.901401, // 지도 중앙 경도
        zoom: 15,
        zoomControl: false,
        zoomControlOptions: { position: "TOP_RIGHT" },
      },
    }

  },
  methods: {
    onLoadMarker: function(marker) {
      this.marker = marker;
      console.log("marker==>", marker);
    },
    onLoadInfoWindow() {
      //this.infoWindow.value = infoWindowObject;
      //console.log("infoWindow=>", infoWindow);
    },
  },
  mounted() {

  },
}
</script>

<style>
.infowindow-style {
  color: black;
  background-color: white;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  padding: 6px 8px;
}
</style>