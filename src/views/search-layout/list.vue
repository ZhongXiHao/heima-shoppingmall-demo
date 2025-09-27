<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)"/>

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="this.$route.query.search"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o"/>
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="no-data" v-if="this.isNoData">
      暂无商品内容，换个关键词试试吧~
    </div>

    <div v-else class="sort-btns">
      <div class="sort-item">综合</div>
      <div class="sort-item">销量</div>
      <div class="sort-item">价格</div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getSearchListApi } from '@/api/getGoodsList'

export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      goodsList: [],
      filteredGoodsList: [],
      page: 1,
      isNoData: false// Suppose data is not empty initially
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search || ''
    },
    queryCategoryId () {
      return this.$route.query.categoryId || ''
    }
  },
  methods: {
    filterSearchList () {
      const searchQuery = this.querySearch
      if (!searchQuery) {
        return this.goodsList
      }
      return this.goodsList.filter(item =>
        item.goods_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
  },
  async created () {
    const res = await getSearchListApi(
      {
        categoryId: this.queryCategoryId,
        goodsName: this.querySearch,
        page: this.page
      }
    )
    this.goodsList = res.data.list.data
    // Check if the list is empty, toggle no-data message
    this.isNoData = this.goodsList.length === 0
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .no-data {
    text-align: center;
    padding: 20px;
    color: #999;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;

    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
