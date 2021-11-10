// 通用 entry
import Vue from 'vue'
import App from './App.vue'

// 導出一個工廠函數，用於創建新的應用程式、router、store 實例
export function createApp (){
    const app = new Vue({
        render: h => h(App)
    })

    return {app}
}



