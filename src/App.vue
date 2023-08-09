<template>
  <router-view />
</template>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>

<script>
// [23.08.08] test code
import request from "axios";
export default {
  mounted() {
    request('http://localhost:8080/api/demo', function (error, response, body) {
      window.console.log('error: ', error);
      window.console.log('statusCode: ', response && response.statusCode);
      window.console.log('body: ', body);
    });
  }
}
</script>