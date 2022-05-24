const { Sequelize } = require('sequelize')
const { db_username, db_password } = require('../env/index')
const env = require('../env/index')

const sequelize = new Sequelize(env.db_database, db_username, db_password, {
    host: env.db_host,
    dialect: 'mysql'
})

const modelDefiners = [
    require('../models/user')
]

for(const modelDefiner of modelDefiners){
    modelDefiner(sequelize)
}

module.exports = sequelize