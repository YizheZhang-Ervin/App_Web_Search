// 相当于后端存储

// 默认分页对象
let pageInfoDefault = {
    currentPage: 1,
    pageSize: 2
}

// 全量设值
export let setDataAll = (data) => {
    localStorage.setItem("allLis", JSON.stringify(data))
    localStorage.setItem("currentLis", JSON.stringify(data))
}
// 全量取值
export let getDataAll = () => {
    return JSON.parse(localStorage.getItem("allLis"))
}
// 当前列表设值
export let setDataCurrent = (data) => {
    localStorage.setItem("currentLis", JSON.stringify(data))
}
// 当前列表取值
export let getDataCurrent = () => {
    return JSON.parse(localStorage.getItem("currentLis"))
}

// 分页取值
export let getDataPage = (paramsDict) => {
    let { currentPage, pageSize } = paramsDict
    let total = getDataCurrent().length
    let start = (currentPage - 1) * pageSize,
        end = currentPage * pageSize
    let data = getDataCurrent().slice(start, end)
    return { total, data }
}
// 查询取值
export let getDataSearch = (paramsDict) => {
    let { value, fields } = paramsDict
    fields = JSON.parse(fields.replaceAll("%22", '"'))
    // 空查询默认会显示全部
    let temp = getDataCurrent().filter(data =>
        data[fields[0]].indexOf(value) !== -1
        || data[fields[1]].toString().indexOf(value) !== -1
        || data[fields[2]].indexOf(value) !== -1
        || data[fields[3]].indexOf(value) !== -1
    )

    // 查询的结果为[]则显示全部
    if (temp.length === 0) {
        return getDataReset()
    }
    setDataCurrent(temp)
    return getDataPage(pageInfoDefault)
}
// 过滤取值
export let getDataFilter = (paramsDict) => {
    // filter,field
    let { filter, field } = paramsDict
    // 选出大于25的
    if (filter == 1) {
        setDataCurrent(getDataCurrent().filter(data => data[field] >= 25))
        return getDataPage(pageInfoDefault)
        // 选出小于25的
    } else if (filter == 2) {
        setDataCurrent(getDataCurrent().filter(data => data[field] < 25))
        return getDataPage(pageInfoDefault)
        // 全部数据
    } else {
        return getDataReset()
    }
}
// 排序取值
export let getDataSort = (paramsDict) => {
    // key,order
    let { key, order } = paramsDict
    // 排序方法
    let sortMethod = (a, b) => {
        return a[key].toString().localeCompare(b[key], "zh-CN");
    }
    // 进行排序
    if (order === "asc") {
        setDataCurrent(getDataCurrent().sort(sortMethod))
    } else {
        setDataCurrent(getDataCurrent().sort(sortMethod).reverse())
    }
    return getDataPage(pageInfoDefault)
}
// 重置取值
export let getDataReset = () => {
    setDataCurrent(getDataAll())
    return getDataPage(pageInfoDefault)
}