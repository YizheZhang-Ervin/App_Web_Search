// TOOL: 上传
let Upload = (req, res, func) => {
    req.setEncoding('utf-8');
    const uploadedFile = req.file
    // 处理上传的文件
    func(uploadedFile)
}

module.exports = { Upload }