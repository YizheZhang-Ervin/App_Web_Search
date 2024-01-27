const axiosInstance = axios.create()

export default {
    props: {
        msg: String,
        trigger: Boolean
    },
    watch: {
        msg(newVal, oldVal) {
            this.searchInput = newVal
        },
        trigger(newVal, oldVal) {
            this.triggerSearch(newVal)
        }
    },
    mounted() {
        // 首次打开搜索抽屉时调用
        this.triggerSearch(this.trigger)
    },
    data() {
        return {
            display: false,
            searchInput: undefined,
            tableData: [
                { title: "1", content: "xxx", link: "http://localhost" },
                { title: "2", content: "yyy", link: "http://localhost" }
            ]
        }
    },
    methods: {
        // 出发搜索
        triggerSearch(flag) {
            if (flag) {
                this.searchInput = this.msg
                this.searchKeyword()
                this.display = true
            } else {
                this.display = false
            }
        },
        // 跳转链接
        handleClick(scope) {
            window.open(scope.row.link)
        },
        searchKeyword() {
            axiosInstance.post("/search", { keyword: this.searchInput })
                .then((res) => {
                    let tmp = res.data.data.map(ele => {
                        return ele._fields[0].properties
                    })
                    this.tableData = tmp
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                })
        },
    },
    template:
        `
<section v-if="display">
    <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="title" label="title" width="150" />
        <el-table-column prop="content" label="content" />
        <el-table-column fixed="right" label="Operations" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope)">
                    点击跳转
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</section>
`
}