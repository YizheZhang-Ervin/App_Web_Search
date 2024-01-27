const { SearchOfNeo4j } = require("../middleware/neo4j.js")
const { MakeResponse } = require("../utils/goResponse.js")

let Search = async (req, res) => {
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

module.exports = {
    Search
}