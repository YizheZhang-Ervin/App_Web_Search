import MyComponent from "./components/MyComponent.js"
const { createApp } = Vue

const app = createApp({
    data() {
        return {
            searchInput: undefined,
            openDrawer: false
        }
    },
    mounted() {
    },
    methods: {
        handleClose() {
            this.openDrawer = false
        },
        doSearch() {
            this.openDrawer = true
        },
    }
})

// 加载组件 & 初始化
app.component("comp", MyComponent)
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')