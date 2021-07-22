<template>
  <div>
    This is header: {{ header }} <br>
    This is data from Parent: {{ dataFromParent }}
    <el-button type="danger" @click="sendToParent">Send props to Parent</el-button>
    <el-button type="danger" @click="sendToParentByParent">Send props to Parent by $parents</el-button>
    <el-button type="danger" @click="sendToFooter">Send data To Footer</el-button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    header: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      parents: '',
      dataFromParent: ''
    }
  },
  methods: {
    sendToParent() {
      this.parents = 'This is data of Children'
      this.$emit('click:receiveProp', this.parents)
    },
    getDataFromParent(value) {
      this.dataFromParent = value
    },
    sendToParentByParent() {
      this.$parent.$parent.setMessage('12345')
    },
    sendToFooter() {
      this.$eventBus.$emit('sendToFooter', 'Hello Footer')
    }
  }
}
</script>

<style scoped>

</style>
