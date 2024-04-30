const express = require(`express`)
const router = express.Router()
const Job = require(`../models/Job`)

// add job via post
router.post(`/add`, (req, resp) => {

    let {title, salary, company, description, email, new_jobs} = req.body

    // insert
    Job.create({
        title, 
        salary, 
        company, 
        description, 
        email, 
        new_jobs})
        .then( () => resp.redirect(`/`) )
        .catch( err => console.log(err) )
})

// detalhe da vaga
router.get("/view/:id", (req, res) => Job.findOne({
    where: {id: req.params.id}
}).then(job => {
    res.render("views", {
        job
    })
}).catch(err => console.log(err))
)

// rota page add
router.get("/add", (req, res)=> {
    res.render("add")
})

module.exports = router