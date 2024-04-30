const Sequelize = require(`sequelize`)
const db = require(`../db/conection`)

const Job = db.define(`jobs`, {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    salary: {
        type: Sequelize.STRING
    },
    company: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    new_jobs: {
        type: Sequelize.INTEGER
    },
})

module.exports = Job