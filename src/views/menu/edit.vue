<template>
  <div>
    <create-edit :is-edit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateEdit from './components/create-edit.vue'

export default Vue.extend({
  name: 'editMenu',
  components: {
    CreateEdit
  }
})
</script>

<style lang="scss" scoped>

</style>
