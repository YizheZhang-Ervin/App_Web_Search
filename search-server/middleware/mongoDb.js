let mongoose = require('mongoose');
let config = require("../config/app.json")
let WaoModel = undefined
let mongoDb = undefined

// 打开连接
let openAndInitOfMongoConnection = () => {
    mongoDb = mongoose.connect(config["mongo"] || "mongodb://127.0.0.1:27017/wao-db");
    let WaoSchema = new mongoose.Schema({
        keyword: { type: String },
        content: { type: String }
    })
    WaoModel = mongoose.model('wao', WaoSchema);
}

// 关闭连接
let closeOfMongoConnection = () => {
    mongoDb.close();
    mongoDb = undefined
    WaoModel = undefined
}

// waoJson:{keyword,content}
let CreateOfMongo = async (waoJson) => {
    openAndInitOfMongoConnection()
    var waoModel = new WaoModel(waoJson);
    waoModel.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('save data is ok!');
        }
        closeOfMongoConnection()
    });
}

// conditionJson:{keyword: xx}
// fieldJson:{ keyword: 1 }
let SearchOfMongo = async (conditionJson, fieldJson) => {
    openAndInitOfMongoConnection()
    WaoModel.find(conditionJson, fieldJson, (err, datas) => {
        if (err) {
            console.log(err);
        } else {
            console.log(datas);
        }
        //关闭数据库    
        closeOfMongoConnection()
    })
}

// conditionJson:{keyword: xx}
// operationJson:{"$set": { content: xxx }}
let UpdateOfMongo = async (conditionJson, operationJson) => {
    openAndInitOfMongoConnection()
    WaoModel.update(conditionJson, operationJson, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('update is ok!');
        }
        //关闭数据库
        closeOfMongoConnection()
    });
}

// conditionJson:{_id:xxx}
let DeleteOfMongo = async (conditionJson) => {
    openAndInitOfMongoConnection()
    WaoModel.remove(conditionJson, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('delete is ok!');
        }
        //关闭数据库
        closeOfMongoConnection()
    })
}

module.exports = {
    CreateOfMongo, SearchOfMongo, UpdateOfMongo, DeleteOfMongo
}