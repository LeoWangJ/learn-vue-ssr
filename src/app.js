// 通用 entry
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
// 導出一個工廠函數，用於創建新的應用程式、router、store 實例
export function createApp (){
    const router = createRouter()
    const store = createStore()

    // 同步路由狀態到 store
    sync(store, router)
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return { app,router,store }
}



