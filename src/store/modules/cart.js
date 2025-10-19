import { deleteGoodsApi, getCartListApi, updateCartApi } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartTotal: 0,
      cartList: [],
      deleteList: []
    }
  },
  mutations: {
    // Set cart list and total
    setCartListAndTotal (state, payload) {
      state.cartList = payload.list
      state.cartTotal = payload.cartTotal
    },
    setDeleteList (state, deleteList) {
      state.deleteList = deleteList
    },
    // Toggle single item's checked state
    toggleChecked (state, goodsId) {
      const item = state.cartList.find(item => item.goods_id === goodsId)
      item.isChecked = !item.isChecked
    },
    // Toggle all items' checked state
    toggleAllChecked (state, isAllChecked) {
      state.cartList.forEach(item => {
        item.isChecked = isAllChecked
      })
    },
    // Update local goods number
    updateLocalGoodsNum (state, { item, goodsNum }) {
      const targetItem = state.cartList.find(i => i.goods_id === item.goods_id)
      if (targetItem) {
        console.log('Updating local goods number:', goodsNum)
        targetItem.goods_num = goodsNum
      }
    }
  },
  actions: {
    async getCartAction (context) {
      const res = await getCartListApi()
      // console.log(res.data.list)
      // The data from server does not contain selected state, so we add it here
      res.data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartListAndTotal', res.data)
    },
    async updateGoodsNumAction (context, { item, goodsNum }) {
      await updateCartApi({
        goodsId: item.goods_id,
        goodsNum: goodsNum,
        goodsSkuId: item.goods_sku_id
      })

      await context.dispatch('getCartAction')
    },
    async deleteGoodsAction (context) {
      const deleteList = context.state.cartList.filter(item => item.isChecked).map(item => item.id)
      // console.log(deleteList)
      await deleteGoodsApi(deleteList)
      Toast('删除成功')

      // Refresh cart list
      await context.dispatch('getCartAction')
      // console.log(res)
    }
  },
  getters: {
    cartTotal: state => state.cartTotal,
    cartList: state => state.cartList,
    totalPrice: state => {
      let total = 0
      state.cartList.forEach(item => {
        // console.log(item.goods_num)
        total += item.goods_num * item.goods.goods_price_min * item.isChecked
      })
      return total.toFixed(2)
    },
    selectedCount: state => {
      let count = 0
      state.cartList.forEach(item => {
        count += item.goods_num * item.isChecked
      })
      return count
    },
    isAllChecked: (state, getters) => {
      return state.cartList.length > 0 && state.cartList.every(item => item.isChecked)
      // return getters.selectedCount === state.cartTotal // When selected count equals total count, all are checked
    }

  }
}
