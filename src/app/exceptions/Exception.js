module.exports = function Exception(errorCode){
    this.code = errorCode.code,
    this.message = errorCode.message
}