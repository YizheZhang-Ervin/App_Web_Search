const Minio = require('minio')
let config = require("../config/app.json")

let minioClient = new Minio.Client(config["minio"]);

let UploadOfMinio = async (bucketName, filePath, fileName) => {
    let isExist = await minioClient.bucketExists(bucketName);
    let err = '';
    console.log('bucket is exist: ', isExist);
    if (!isExist) {
        //创建桶后，需要在管理界面修改public访问权限，默认是private
        let region = 'cn-north-1'
        err = await minioClient.makeBucket(bucketName, region);
    }
    if (!err) {
        await minioClient.fPutObject(bucketName, fileName, filePath);
        let host = config["minio"]["endPoint"]
        let port = config["minio"]["port"]
        return `http://${host}:${port}/${bucketName}/` + fileName;
    }
}

let RemoveOfMinio = async (bucketName, objName) => {
    return await minioClient.removeObject(bucketName, objName)
}

module.exports = {
    UploadOfMinio, RemoveOfMinio
}