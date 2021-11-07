<template>
	<div class="test">
		<Divider>路由重定向</Divider>
		<router-link to="/test">Test</router-link>
		<br /><br />
		<!-- ########################代码对比######################## -->
		<Divider>代码对比</Divider>
		<code-diff
			:old-string="oldStr"
			:new-string="newStr"
			:context="1000"
			outputFormat="side-by-side"
			class="code-diff"
		/>
		<br /><br />
		<!-- ########################自带过滤排序(无分页)######################## -->
		<Divider>自带过滤排序(无分页)</Divider>
		<Table
			:columns="columns1"
			:data="data1"
		></Table>
		<br /><br />
		<!-- ########################自定义过滤排序(有分页)######################## -->
		<Divider>自定义过滤排序(有分页)</Divider>
		<Input
			search
			enter-button
			placeholder="任意字段搜索"
			@on-search="searchByKey"
			v-model="searchKey"
		/>
		<Button @click="resetSearchByKey">重置</Button>
		<Table
			:columns="columns2"
			:data="display_data2"
			@on-sort-change="changeSort"
			@on-filter-change="changeFilter"
		></Table>
		<Page
			:total="pageInfo2.dataTotal"
			:current="pageInfo2.currentPage"
			:page-size="pageInfo2.pageSize"
			:page-size-opts="pageInfo2.pageSizeOpts"
			show-sizer
			show-total
			@on-change="changePage"
			@on-page-size-change="changePageSize"
		/>
		<br /><br />
		<Divider>自定义过滤排序(有分页)</Divider>
		<Input
			search
			enter-button
			placeholder="任意字段搜索"
			@on-search="searchByKeyMock"
			v-model="searchKeyMock"
		/>
		<Button @click="resetSearchByKeyMock">重置</Button>
		<Table
			:columns="columns3"
			:data="data3"
			@on-sort-change="changeSortMock"
			@on-filter-change="changeFilterMock"
		></Table>
		<Page
			:total="pageInfo3.dataTotal"
			:current="pageInfo3.currentPage"
			:page-size="pageInfo3.pageSize"
			:page-size-opts="pageInfo3.pageSizeOpts"
			show-sizer
			show-total
			@on-change="changePageMock"
			@on-page-size-change="changePageSizeMock"
		/>
	</div>
</template>

<script>
	import CodeDiff from "vue-code-diff";
	import { saveAPI, pageAPI, searchAPI, filterAPI, sortAPI, resetAPI } from "../API/testAPI.js"
	export default {
		name: "Test",
		components: { CodeDiff },
		props: {},
		data() {
			return {
				useFilter: false,
				lastFilterCol: "",
				searchKey: "",
				searchKeyMock: "",
				oldStr: "old code\nsame code\nsame code\nsame code\nsame\nsame code\nsame code\nsame code\nsame code code                                                           ",
				newStr: "new code\nsame code\nsame code\nsame code\nsame\nsame code\nsame code\nsame code\nsame code code                                                           ",
				pageInfo2: {
					dataTotal: 1,
					currentPage: 1,
					pageSize: 2,
					pageSizeOpts: [2, 5, 10]
				},
				pageInfo3: {
					dataTotal: 1,
					currentPage: 1,
					pageSize: 2,
					pageSizeOpts: [2, 5, 10]
				},
				columns1: [
					{
						title: "Name",
						key: "name",
						sortable: true,
						// 中文字排序
						sortMethod(a, b, type) {
							if (type === "asc") {
								return a.localeCompare(b, "zh-CN");
							} else {
								return b.localeCompare(a, "zh-CN");
							}
						},
					},
					{
						title: "Age",
						key: "age",
						sortable: true,
						// 过滤筛选
						filters: [
							{
								label: "Greater than 25",
								value: 1,
							},
							{
								label: "Less than 25",
								value: 2,
							},
						],
						filterMultiple: false,
						filterMethod(value, row) {
							if (value === 1) {
								return row.age > 25;
							} else if (value === 2) {
								return row.age < 25;
							}
						},
					},
					{
						title: "Address",
						key: "address",
						sortable: true,
						// 字母排序
						sortMethod(a, b, type) {
							if (type === "asc") {
								return a.localeCompare(b, "en-US");
								// return a.charCodeAt(0)-b.charCodeAt(0)
							} else {
								return b.localeCompare(a, "en-US");
								// return b.charCodeAt(0)-a.charCodeAt(0)
							}
						},
					},
					{
						title: "date",
						key: "date",
						sortable: true,
					},
				],
				columns2: [
					{
						title: "Name",
						key: "name",
						sortable: 'custom'
					},
					{
						title: "Age",
						key: "age",
						sortable: true,
						filters: [
							{
								label: 'Greater than 25',
								value: 1
							},
							{
								label: 'Less than 25',
								value: 2
							}
						],
						filterMultiple: false,
						filterRemote(value, field) {
							console.log(value, field)
						}
						// filterMethod(value, row) {
						// 	if (value === 1) {
						// 		return row.age > 25;
						// 	} else if (value === 2) {
						// 		return row.age < 25;
						// 	}
						// }
					},
					{
						title: "Address",
						key: "address",
						sortable: true,
					},
					{
						title: "date",
						key: "date",
						sortable: true,
					},
				],
				columns3: [
					{
						title: "Name",
						key: "name",
						sortable: 'custom'
					},
					{
						title: "Age",
						key: "age",
						sortable: true,
						filters: [
							{
								label: 'Greater than 25',
								value: 1
							},
							{
								label: 'Less than 25',
								value: 2
							}
						],
						filterMultiple: false,
						filterRemote(value, field) {
							console.log(value, field)
						}
						// filterMethod(value, row) {
						// 	if (value === 1) {
						// 		return row.age > 25;
						// 	} else if (value === 2) {
						// 		return row.age < 25;
						// 	}
						// }
					},
					{
						title: "Address",
						key: "address",
						sortable: 'custom',
					},
					{
						title: "date",
						key: "date",
						sortable: 'custom',
					},
				],
				data1: [
					{
						name: "啊",
						age: 18,
						address: "AA",
						date: "2016-10-03",
					},
					{
						name: "不",
						age: 24,
						address: "AB",
						date: "2016-10-01",
					},
					{
						name: "才",
						age: 30,
						address: "AC",
						date: "2016-10-02",
					},
					{
						name: "都",
						age: 26,
						address: "AD",
						date: "2016-10-04",
					},
				],
				data2: [
					{
						name: "啊",
						age: 18,
						address: "AA",
						date: "2016-10-03",
					},
					{
						name: "不",
						age: 24,
						address: "AB",
						date: "2016-10-01",
					},
					{
						name: "才",
						age: 30,
						address: "AC",
						date: "2016-10-02",
					},
					{
						name: "都",
						age: 26,
						address: "AD",
						date: "2016-10-04",
					},
				],
				data2_raw: [],
				display_data2: [],
				filter_data2: [],
				data3_raw: [
					{
						name: "啊",
						age: 18,
						address: "AA",
						date: "2016-10-03",
					},
					{
						name: "不",
						age: 24,
						address: "AB",
						date: "2016-10-01",
					},
					{
						name: "才",
						age: 30,
						address: "AC",
						date: "2016-10-02",
					},
					{
						name: "都",
						age: 26,
						address: "AD",
						date: "2016-10-04",
					},
				],
				data3: []
			};
		},
		mounted() {
			// table2
			this.getData()
			// table3
			this.initData()
		},
		methods: {
			// -----------------------------------------table2---------------------------------------------
			// 所有字段中查询
			searchByKey(value) {
				// console.log(value)
				// 关闭过滤器
				this.closeFilter()
				// 判断查询值是否空
				if (value === undefined || value === "") {
					this.data2 = this.data2_raw
					this.changePage(1)
					return
				}
				let temp = this.data2_raw.filter(data => data.name.indexOf(value) !== -1
					|| data.address.indexOf(value) !== -1
					|| data.age.toString().indexOf(value) !== -1
					|| data.date.indexOf(value) !== -1)
				// 判断是否使用过滤器
				this.useFilter ? this.filter_data2 = temp : this.data2 = temp
				this.changePage(1)
			},
			// 重置
			resetSearchByKey() {
				this.searchKey = ""
				// 关闭过滤器
				this.closeFilter()
				// 重置源数据
				this.data2 = this.data2_raw
				this.getData()
			},
			// 获取数据
			getData() {
				// 原始数据
				this.data2_raw = this.data2
				// 给表格设置数据
				this.changePage(1)
			},
			// 换页
			changePage(page = 1) {
				// console.log("当前页", page)
				this.pageInfo2.currentPage = page
				let start = (this.pageInfo2.currentPage - 1) * this.pageInfo2.pageSize
				let end = this.pageInfo2.currentPage * this.pageInfo2.pageSize
				// 判断是否使用过滤器
				let usedData = this.useFilter ? this.filter_data2 : this.data2
				// 设置总数据条数
				this.pageInfo2.dataTotal = usedData.length
				this.display_data2 = usedData.slice(start, end)
			},
			// 换每页显示条数
			changePageSize(pageSize) {
				// console.log("每页显示条数", pageSize)
				this.pageInfo2.pageSize = pageSize
				this.changePage(1)
			},
			// 排序改变
			changeSort({ key, order }) {
				// console.log(key, order)
				// 排序方法
				let sortMethod = (a, b) => {
					return a[key].toString().localeCompare(b[key], "zh-CN");
				}
				// 判断是否使用过滤器
				let usedData = this.useFilter ? this.filter_data2 : this.data2
				// 进行排序
				order === "asc" ? usedData = usedData.sort(sortMethod) : usedData = usedData.sort(sortMethod).reverse()
				// 分页
				this.changePage(1)
			},
			// 筛选改变
			changeFilter(col) {
				// console.log(col)
				this.lastFilterCol = col
				let filter = col._filterChecked
				let field = col.key
				// 使用过滤器
				this.useFilter = true
				// 选出大于25的
				if (filter == 1) {
					this.filter_data2 = this.data2.filter(data => data[field] >= 25)
					// 选出小于25的
				} else if (filter == 2) {
					this.filter_data2 = this.data2.filter(data => data[field] < 25)
					// 全部数据
				} else {
					this.closeFilter()
					this.filter_data2 = this.data2
				}
				// 分页
				this.changePage(1)
			},
			// 关闭过滤器
			closeFilter() {
				this.useFilter = false
				this.lastFilterCol._isFiltered = false
				this.lastFilterCol._filterChecked = []
			},
			// -----------------------------------------table3---------------------------------------------
			// 初始化数据
			initData() {
				// 存储数据
				saveAPI(this.data3_raw).then(res => {
					if (res) {
						// 取得分页数据
						pageAPI(this.pageInfo3).then(res2 => {
							this.pageInfo3.dataTotal = res2.data.total
							this.data3 = res2.data.data
						})
					}
				})
			},
			// 结果中搜索
			searchByKeyMock(value) {
				let fields = ["name", "age", "address", "date"]
				searchAPI(value, fields).then(res => {
					this.pageInfo3.dataTotal = res.data.total
					this.data3 = res.data.data
				})
			},
			// 重置
			resetSearchByKeyMock() {
				resetAPI().then(res => {
					this.pageInfo3.dataTotal = res.data.total
					this.data3 = res.data.data
				})
			},
			// 排序
			changeSortMock({ key, order }) {
				sortAPI(key, order).then(res => {
					this.pageInfo3.dataTotal = res.data.total
					this.data3 = res.data.data
				})
			},
			// 过滤
			changeFilterMock(col) {
				let filter = col._filterChecked[0]
				let field = col.key
				filterAPI(filter, field).then(res => {
					this.pageInfo3.dataTotal = res.data.total
					this.data3 = res.data.data
				})
			},
			// 换页
			changePageMock(page = 1) {
				this.pageInfo3.currentPage = page
				pageAPI(this.pageInfo3).then(res => {
					this.pageInfo3.dataTotal = res.data.total
					this.data3 = res.data.data
				})
			},
			// 换每页显示条数
			changePageSizeMock(pageSize) {
				this.pageInfo3.pageSize = pageSize
				pageAPI(this.pageInfo3).then(res => {
					this.pageInfo3.dataTotal = res.data.total
					this.data3 = res.data.data
				})
			},
		},
	};
</script>

<style>
	.test {
		font-size: 2em;
	}
	.d2h-file-side-diff {
		height: 10vh;
		overflow: auto;
	}
	.d2h-files-diff :first-child {
		position: relative;
	}
</style>
