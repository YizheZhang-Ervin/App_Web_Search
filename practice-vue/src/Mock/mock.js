import Mock from 'mockjs'
import { setDataAll, getDataPage, getDataSearch, getDataFilter, getDataSort, getDataReset } from './frontendDB.js'

// 相当于后端接收请求

// 获取路由参数方法
let getParams = (options) => {
    let url = options.url;
    let params = url.split("?")[1]
    let paramsLis = params.split("&")
    let paramsDict = {}
    paramsLis.forEach(data => {
        let temp = data.split("=")
        paramsDict[temp[0]] = temp[1]
    })
    return paramsDict
}

// 把值存入列表和localstorage
Mock.mock("/mock/setData/all", "post", (options) => {
    // options: url,type,body
    let data = JSON.parse(options.body)
    setDataAll(data)
})
// 分页取值
Mock.mock(/\/mock\/getData\/page.*/, "get", (options) => {
    let paramsDict = getParams(options)
    return getDataPage(paramsDict)
})
// 查询取值
Mock.mock(/\/mock\/getData\/search.*/, "get", (options) => {
    let paramsDict = getParams(options)
    return getDataSearch(paramsDict)
})
// 过滤取值
Mock.mock(/\/mock\/getData\/filter.*/, "get", (options) => {
    let paramsDict = getParams(options)
    return getDataFilter(paramsDict)
})
// 排序取值
Mock.mock(/\/mock\/getData\/sort.*/, "get", (options) => {
    let paramsDict = getParams(options)
    return getDataSort(paramsDict)
})
// 重置取值
Mock.mock(/\/mock\/getData\/reset.*/, "get", () => {
    return getDataReset()
})