<template>
  <div id="app">
    <router-view/>
    <van-rate v-model="value"/>
  </div>
</template>

<style lang="less">

</style>

<script>
export default {
  data () {
    return {
      value: 3
    }
  }
}
</script>
