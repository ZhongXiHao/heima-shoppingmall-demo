<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"/>

    <van-search v-model.trim="searchInput" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="addSearchText(searchInput)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="searchHistory.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clearSearchHistory"/>
      </div>
      <div class="list">
        <div class="list-item"
             v-for="item in searchHistory"
             :key="item"
             @click="addSearchText(item)"
        >
          {{ item }}
        </div>
        <!--        <div class="list-item" @click="$router.push('/search-list')">电视</div>-->
        <!--        <div class="list-item" @click="$router.push('/search-list')">冰箱</div>-->
        <!--        <div class="list-item" @click="$router.push('/search-list')">手机</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHistory, setSearchHistory } from '@/utils/storage'

export default {
  name: 'SearchLayout',
  data () {
    return {
      searchInput: '',
      searchHistory: [
        '炒锅', '电视', '冰箱', '手机'
      ]
    }
  },
  methods: {
    addSearchText (searchText) {
      if (searchText.trim() === '') return
      // Remove the term if it already exists first
      const index = this.searchHistory.indexOf(searchText)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      // Add the new search term to the front
      this.searchHistory.unshift(searchText)
      // this.searchInput = ''
      // Limit the history to 15 items
      if (this.searchHistory.length > 15) {
        this.searchHistory.pop()
      }
      // Save to local storage
      setSearchHistory(this.searchHistory)
      this.$router.push(`/search-list?search=${searchText}`)
    },
    clearSearchHistory () {
      this.searchHistory = []
    }
  },
  created () {
    this.searchHistory = getSearchHistory()
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
