import axios from 'axios'

// 把值存入列表和localstorage
export let saveAPI = (data) => {
    return axios.request({
        method: "POST",
        url: "/mock/setData/all",
        params: "",
        data: data
    })
}
// 分页取值
export let pageAPI = (pageInfo) => {
    return axios.request({
        method: "GET",
        url: "/mock/getData/page",
        params: {
            currentPage: pageInfo.currentPage,
            pageSize: pageInfo.pageSize
        },
        data: ""
    })
}
// 查询取值
export let searchAPI = (value, fields) => {
    return axios.request({
        method: "GET",
        url: "/mock/getData/search",
        params: {
            value: value,
            fields: JSON.stringify(fields)
        },
        data: ""
    })
}
// 过滤取值
export let filterAPI = (filter, field) => {
    return axios.request({
        method: "GET",
        url: "/mock/getData/filter",
        params: {
            filter: filter,
            field: field
        },
        data: ""
    })
}
// 排序取值
export let sortAPI = (key, order) => {
    return axios.request({
        method: "GET",
        url: "/mock/getData/sort",
        params: {
            key: key,
            order: order
        },
        data: ""
    })
}
// 重置取值
export let resetAPI = () => {
    return axios.request({
        method: "GET",
        url: "/mock/getData/reset",
        params: "",
        data: ""
    })
}