const { SearchOfNeo4j } = require("../middleware/neo4j.js")
const { HGetOfRedis } = require("../middleware/redis.js")
const { MakeResponse } = require("../utils/goResponse.js")

let SearchByNeo4j = async (req, res) => {
    // SystemObj:{title,content,link}
    let queryStr = "MATCH (s:SystemObj {title: $title}) RETURN s"
    let paramJson = { title: req.body["keyword"] }
    SearchOfNeo4j(queryStr, paramJson, (result) => {
        if (result) {
            MakeResponse(res, true, result.records, "查询成功")
        } else {
            MakeResponse(res, false, err, "查询失败")
        }
    })
}

let SearchByRedis = async (req, res) => {
    let keyword = req.body["keyword"]
    let result = await HGetOfRedis(keyword)
    if (result) {
        MakeResponse(res, true, result, "查询成功")
    } else {
        MakeResponse(res, false, null, "查询失败")
    }
}

module.exports = {
    SearchByNeo4j, SearchByRedis
}