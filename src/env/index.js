require('dotenv').config()

module.exports = {
    db_database:process.env.DB_DATABASE,
    db_username:process.env.DB_USERNAME,
    db_password:process.env.DB_PASSWORD,
    db_host:process.emitWarning.DB_HOST,
    port:process.env.PORT,
    access_token_secret:process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret:process.env.REFRESH_TOKEN_SECRET
}