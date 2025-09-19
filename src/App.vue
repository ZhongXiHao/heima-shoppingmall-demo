<template>
  <div id="app">
    <div class="box"></div>
    <router-view/>
    <van-rate v-model="value"/>
  </div>
</template>

<style lang="less">
  .box{
    width: 300px;
    height: 300px;
    background-color: pink;

  }
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
