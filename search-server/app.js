const bodyParser = require('body-parser')
let express = require('express')
const multer = require('multer')
let https = require('https')
let path = require("path")
let fs = require('fs');
let app = express();
let registerRoute = require("./router/router.js")

// read config
let config = require("./config/app.json")
let port = config["port"] || 3000
let address = config["address"] || "0.0.0.0"
let uploadPath = config["uploadPath"] || "/home/"
let serverKeyPath = config["serverKeyPath"] || './keys/server.key'
let serverCrtPath = config["serverCrtPath"] || './keys/server.crt'
let useHttps = config["useHttps"] || "yes"

// response
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
    next()
});

// file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath) // 指定保存到uploads文件夹下
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage });

// frontend view
app.engine("html", require("ejs").__express);
app.set('view engine', 'html'); // 指定使用EJS作为模板引擎
app.set('views', path.join(__dirname, '../search-client'))
app.use(express.static(path.join(__dirname, '../search-client')));

// routes
registerRoute(app, upload)

// web server
if (useHttps === "yes") {
    let httpsServer = https.createServer({
        key: fs.readFileSync(serverKeyPath),
        cert: fs.readFileSync(serverCrtPath)
    }, app);
    let server = httpsServer.listen(port, address, () => {
        let host = server.address().address
        let port = server.address().port
        console.log("App Starts At: https://%s:%s", host, port)
    })
} else {
    let server = app.listen(port, address, () => {
        let host = server.address().address
        let port = server.address().port
        console.log("App Starts At: http://%s:%s", host, port)
    })
}
