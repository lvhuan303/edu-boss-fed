<template>
  <div>
    <create-edit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateEdit from './components/create-edit.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateEdit
  }
})
</script>

<style lang="scss" scoped>

</style>
