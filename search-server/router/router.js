let { Upload } = require("../handler/uploadHandler.js")
let { Login, Logout } = require("../handler/loginHandler.js")
let { SearchByNeo4j, SearchByRedis } = require("../handler/searchHandler.js")

let registerRoute = (app, upload) => {
    // main page
    app.get("/", (req, res) => {
        res.render('index');
    })
    // API: upload api
    app.post("/upload", upload.single("file"), Upload)

    // API: search api
    app.post("/search", SearchByNeo4j)
    app.post("/search/redis", SearchByRedis)

    // API: login
    app.post("/login", Login)
    app.post("/logout", Logout)
}

module.exports = registerRoute