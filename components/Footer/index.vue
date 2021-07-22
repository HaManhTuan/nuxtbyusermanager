<template>
  <div>
    <div class="title">
      <slot name="title"/>
    </div>
    <div class="content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      footer: ''
    }
  },
  created() {
    this.$eventBus.$on('sendToFooter', (data) => {
      this.getData(data)
    })
  },
  methods: {
    getData(data) {
      this.footer = data
    }
  }
}
</script>

<style scoped>

</style>
