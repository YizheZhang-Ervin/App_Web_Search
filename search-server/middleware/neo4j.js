const neo4j = require("neo4j-driver");
let config = require("../config/app.json")

// 连接客户端
let url = config["neo4j"]["url"]
let username = config["neo4j"]["username"]
let password = config["neo4j"]["password"]
const driver = neo4j.driver(url, neo4j.auth.basic(username, password));
const session = driver.session();

// query:"MATCH (n) RETURN n"
// callback: (err,result)=>{console.log(err || result.records)}
let SearchOfNeo4j = async (query, callback) => {
    session.run(query).then(callback);
}



