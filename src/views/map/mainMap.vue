<template>
  <div>메인지도 메뉴</div>
  <naver-map style="width: 100%; height: 600px" :mapOptions="mapOptions">
    <naver-marker
        :latitude="37.51347"
        :longitude="127.041722"
        @onLoad="onLoadMarker($event)"
    >
    </naver-marker>
  </naver-map>
</template>

<script>
export default {
  name: 'mainMap',
  data() {
    return {
      map: null,
      marker: null,
      mapOptions : {
        latitude: 37.51347, // 지도 중앙 위도
        longitude: 127.041722, // 지도 중앙 경도
        zoom: 13,
        zoomControl: false,
        zoomControlOptions: { position: "TOP_RIGHT" },
      },
    }

  },
  methods: {
    onLoadMarker: function(markerObject) {
      markerObject = this.marker.value;
      console.log("marker==>", markerObject);
    }
  },
  mounted() {

  },
}
</script>

<style>

</style>