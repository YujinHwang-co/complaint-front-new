<template>
  <div>
    <div ref="embed" />
  </div>
</template>

<script>
export default {
  name: 'daumAddr',
  data() {
    return {}
  },
  components: {},
  props: {},
  emits: ['callback'],
  methods: {
    showApi: function () {
      new window.daum.Postcode({
        width: '100%',
        oncomplete: (data) => {
          this.$emit('callback', data)
        },
      }).embed(this.$refs.embed)
    },
  }, // end methods
  mounted() {
    // mounted() 에서 헤더 정보 넣기
    this.showApi()
  },
}
</script>