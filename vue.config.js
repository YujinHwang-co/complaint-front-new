const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../src/main/resources/static", // 빌드 타겟 디렉토리 지정
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // '/api'로 오면 스프링 서버로 proxy 처리
        changeOrigin: true,
        ws: true
      }
    }
  }
})
