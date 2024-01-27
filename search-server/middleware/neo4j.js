const neo4j = require("neo4j-driver");
let config = require("../config/app.json")
let driver = undefined
let session = undefined

let openOfNeo4jConnection = async () => {
    let url = config["neo4j"]["url"]
    let username = config["neo4j"]["username"]
    let password = config["neo4j"]["password"]
    let db = config["neo4j"]["db"]
    driver = neo4j.driver(url, neo4j.auth.basic(username, password))
    // const serverInfo = await driver.getServerInfo()
    session = driver.session({ database: db });
}

let closeOfNeo4jConnection = () => {
    session.close()
    driver.close()
    session = undefined
    driver = undefined
}

// query:"MATCH (n) RETURN n"
// callback: (err,result)=>{console.log(err || result.records)}
let SearchOfNeo4j = async (query, paramJson, callback) => {
    openOfNeo4jConnection()
    session
        .run(query, paramJson)
        .then(callback)
        .finally(() => {
            closeOfNeo4jConnection()
        });
}

// queryStr:'MATCH (p:Person {age: $age}) RETURN p.name AS name'
// paramJson:{ age: 42 }
// dbJson:{ database: 'neo4j' }
let SearchOfNeo4jNotSession = async (queryStr, paramJson, dbJson) => {
    openOfNeo4jConnection()
    // Get the name of all 42 year-olds
    const { records, summary, keys } = await driver.executeQuery(queryStr, paramJson, dbJson)
    // Summary information
    console.log(`Query: ${summary.query.text}, Records: ${records.length}, Time: ${summary.resultAvailableAfter} ms`)
    for (let record of records) {
        console.log(record.get('name'))
    }
    closeOfNeo4jConnection()
}

// queryStr:`MATCH (p:Person WHERE p.name STARTS WITH $filter) RETURN p.name AS name ORDER BY name`
// paramJson:{ filter: 'Al' }
let TransactionReadOfNeo4j = async (queryStr, paramJson) => {
    openOfNeo4jConnection()
    try {
        const result = await session.executeRead(async tx => {
            return await tx.run(queryStr, paramJson)
        })
        console.log(
            `The query ${result.summary.query.text} returned ${result.records.length} nodes.`
        )
        for (let record of result.records) {
            console.log(`Person with name: ${record.get('name')}`)
            console.log(`Available properties for this node are: ${record.keys}\n`)
        }
    } finally {
        await session.close()
    }
    closeOfNeo4jConnection()
}

// queryStr1:`MERGE (p:Person {name: $name}) RETURN p.name AS name`
// paramJson1:{ name: name }
// queryStr2:`MATCH (o:Organization) RETURN o.id AS id, COUNT{(p:Person)-[r:WORKS_FOR]->(o)} AS employeesN ORDER BY o.createdDate DESC LIMIT 1`
// paramJson2:{xx:xx}
let TransactionWriteOfNeo4j = async (queryStr1, paramJson1, queryStr2, paramJson2) => {
    openOfNeo4jConnection()
    await session.executeWrite(async tx => {
        await tx.run(queryStr1, paramJson1)
        let result = await tx.run(queryStr2, paramJson2)
        console.log(result.records[0])
    })
    closeOfNeo4jConnection()
}

module.exports = {
    SearchOfNeo4j, SearchOfNeo4jNotSession, TransactionReadOfNeo4j, TransactionWriteOfNeo4j
}