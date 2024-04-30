const Sequelize = require("sequelize")

const sequelize = new Sequelize({
    dialect: `sqlite`,
    storage: `../private/db/app.db`
})

module.exports = sequelize