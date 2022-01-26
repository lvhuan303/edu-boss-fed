<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
}).then(res => {
  console.log(res)
})
export default Vue.extend({
  data () {
    return {
      a: 1,
      b: '2',
      c: 3,
      d: {
        a: 1
      }
    }
  },
  methods: {
  }
})
</script>
<!--<script>-->
<!--export default {-->
<!--  data () {-->
<!--    return {-->
<!--      a: 1,-->
<!--      b: '2',-->
<!--      c: 3,-->
<!--      d: {-->
<!--        a: 1-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    test () {-->
<!--      this.a.abc()-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<style lang="scss" scoped>
.test {
  color: $success-color
}
</style>
