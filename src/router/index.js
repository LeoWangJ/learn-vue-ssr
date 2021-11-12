import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 使用工廠函數是因為每次請求時都需要創建新的實例給客戶端，否則會導致狀態污染
// 若為創建新的實例 服務端只會有一個router, 而各個客戶端來請求都會使用到有相同狀態的 router
export default function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('@/components/Index.vue') },
      { path: '/detail', component: () => import('@/components/Detail.vue') }
    ]
  })
}
