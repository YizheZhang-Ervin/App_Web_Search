const { ExistOfEtcd, GetOfEtcd, SetOfEtcd } = require("../middleware/etcd.js")
const { MakeResponse } = require("../utils/goResponse.js")

// POST 登录
let Login = async (req, res) => {
    let userId = req.body["userId"]
    let pwd = req.body["password"]
    let storeKey = `user/${userId}`

    // IF 用户不存在
    if (!ExistOfEtcd(storeKey)) {
        MakeResponse(res, false, "", `用户不存在or密码不正确`)
        return
    } else {
        let userJson = await GetOfEtcd(storeKey)
        // 比对密码
        let passedPwd = Buffer.from(pwd).toString('base64')
        let userInfoObj = JSON.parse(userJson)
        let storePwd = userInfoObj["password"]
        // 生成token
        let token = Buffer.from(userId + "#" + pwd).toString('base64')
        userInfoObj["token"] = token
        let userInfoObjNew = JSON.stringify(userInfoObj)
        // token写库
        await LockByEtcd(storeKey, SetOfEtcd, [storeKey, userInfoObjNew])
        // 返回响应
        if (passedPwd === storePwd) {
            MakeResponse(res, true, token, "登录成功")
        } else {
            MakeResponse(res, true, null, "用户不存在or密码不正确")
        }
    }
}

// POST 退出
let Logout = async (req, res) => {
    let userId = req.body["userId"]
    let storeKey = `user/${userId}`

    let userJson = await GetOfEtcd(storeKey)
    let userInfoObj = JSON.parse(userJson)
    userInfoObj["token"] = ""
    let userInfoObjNew = JSON.stringify(userInfoObj)
    await LockByEtcd(storeKey, SetOfEtcd, [storeKey, userInfoObjNew])
    MakeResponse(res, true, null, "登出成功")
}

// 验证token
let VerifyToken = (req) => {
    const token = req.get('Authorization')
    if (!token) {
        return false
    }
    // token解析
    let tokenStr = Buffer.from(token, 'base64').toString()
    if (tokenStr) {
        let tokenList = tokenStr.split("#")
        if (tokenList.length == 2) {
            let decodeUserId = tokenList[0]
            let storeKey = `user/${decodeUserId}`
            // 判断是否一致
            let userInfoJson = GetOfEtcd(storeKey)
            let userInfoObj = JSON.parse(userInfoJson)
            if (userInfoObj != null) {
                let storeToken = userInfoObj["token"]
                if (storeToken == token) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    } else {
        return false
    }
}

module.exports = {
    Login, Logout, VerifyToken
}