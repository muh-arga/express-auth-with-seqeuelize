const app = require('./src/express')
const sequelize = require('./src/sequelize')
const env = require('./src/env')

async function assertDatabaseConnectionOk() {
    console.log('Checking database connection...')
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        console.log('Database connection OK!! 🚀🚀')
    } catch (error) {
        console.log('Unable to connect to the database')
        console.log(error.message)
        process.exit(1)
    }
}

async function init() {
    await assertDatabaseConnectionOk()

    console.log(`Starting sequelize + Express on port ${env.port}...`)

    app.listen(env.port, () => {
        console.log(`Express server started on http://127.0.0.1:${env.port}`)
    })
}

init()