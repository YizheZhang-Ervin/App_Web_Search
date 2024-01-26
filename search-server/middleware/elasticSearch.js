const { Client } = require('@elastic/elasticsearch')
let config = require("../config/app.json")

// 连接客户端
let conf = {
    node: config["es"] || "http://127.0.0.1:9200",
    // auth: {
    //     apiKey: {
    //         id: 'root',
    //         api_key: 'root',
    //     },
    //     username: 'root',
    //     password: 'root'
    // },
    // tls: {
    //     ca: fs.readFileSync('./xx.crt'),
    //     rejectUnauthorized: false
    // }
}
const client = new Client(conf)

// indexName: xxx
let CreateIndexOfES = async (indexName) => {
    await client.indices.create({ index: indexName })
}

// indexName: xxx
// docId: xxx
// documentJson: {xx:yy}
let CreateDocOfES = async (indexName, docId, documentJson) => {
    await client.index({
        index: indexName,
        id: docId,
        document: documentJson,
    })
}

// indexName: xxx
let DeleteIndexOfES = async (indexName) => {
    await client.indices.delete({ index: indexName })
}

// indexName: xxx
// docId: xxx
let DeleteDocOfES = async (indexName, docId) => {
    await client.delete({
        index: indexName,
        id: docId,
    })
}

// indexName: xxx
// docId: xxx
let GetOfES = async (indexName, docId) => {
    await client.get({
        index: indexName,
        id: docId,
    })
}

// matchJson: {xx:yy}
let SearchOfES = async (matchJson) => {
    await client.search({
        query: {
            match: matchJson
        }
    })
}

// indexName: xxx
// docId: xxx
// documentJson: {xx:yy}
let UpdateOfES = async (indexName, docId, documentJson) => {
    await client.update({
        index: indexName,
        id: docId,
        doc: documentJson,
    })
}

module.exports = {
    CreateIndexOfES, CreateDocOfES, DeleteIndexOfES, DeleteDocOfES, GetOfES, SearchOfES, UpdateOfES
}