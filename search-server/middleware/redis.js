let { createClient } = require('redis');
let config = require("../config/app.json")
let client = undefined

let openOfRedisConnection = async () => {
    let conf = {
        url: config["redis"] || 'redis://root:root@127.0.0.1:6379'
        // username: 'default',
        // password: 'root',
        // socket: {
        //     host: '127.0.0.1',
        //     port: 6379,
        //     tls: true,
        //     key: readFileSync('./xx.key'),
        //     cert: readFileSync('./xx.crt'),
        //     ca: [readFileSync('./xx.pem')]
        // }
    }
    client = createClient(conf)
    client.on('error', err => console.log('Redis Client Error', err))
    await client.connect()
}

let closeOfRedisConnection = async () => {
    await client.disconnect()
}

let SetOfRedis = async (key, value) => {
    await openOfRedisConnection()
    await client.set(key, value);
    await closeOfRedisConnection()
}

let HSetOfRedis = async (key, valueJson) => {
    await openOfRedisConnection()
    await client.hSet(key, valueJson)
    await closeOfRedisConnection()
}

let GetOfRedis = async (key) => {
    await openOfRedisConnection()
    try {
        return await client.get(key);
    } catch (err) {
        console.log(err)
    } finally {
        await closeOfRedisConnection()
    }
}

let HGetOfRedis = async (key) => {
    await openOfRedisConnection()
    try {
        let nowSession = await client.hGetAll(key);
        return JSON.stringify(nowSession, null, 2)
    } catch (err) {
        console.log(err)
    } finally {
        await closeOfRedisConnection()
    }
}

module.exports = {
    SetOfRedis, HSetOfRedis, GetOfRedis, HGetOfRedis
}