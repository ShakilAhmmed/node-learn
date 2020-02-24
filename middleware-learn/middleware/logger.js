function log(request , response , next ){
    console.log("Logging")
    next()
}

module.exports = log;