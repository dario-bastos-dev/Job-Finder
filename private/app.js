const express = require("express");
const hbs = require("express-handlebars").engine;
const app = express();
const path = require("path")
const db = require(`./db/conection`);
const bodyParser = require(`body-parser`)
const Job = require("./models/Job");
const op = require("sequelize").Op

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`O Express está funcionando na porta ${PORT}`);
});

// db conection
db.authenticate()
  .then(() => {
    console.log(`Conectado com sucesso`);
  })
  .catch((err) => {
    console.log(`Ocorreu um erro`, err);
  });

// body parser
app.use(bodyParser.urlencoded( {extended: false} ))

// handlebars
app.set('views', path.join(__dirname, "views"))
app.engine("handlebars", hbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

// static folder
app.use(express.static(path.join(__dirname, "../public")))

// routes
app.get(`/`, (req, res) => {

  let search = req.query.job
  let query = '%'+search+'%'

  if(!search) {

    Job.findAll({order:
      ["createdAt"]})
      
      .then(jobs => {
        
        res.render(`index`, {
          jobs
        });
      })
      .catch(err => console.log(err))

  } else {

    Job.findAll({
      
      where:{title: {[op.like]:query}},
      order:
      ["createdAt"]})
      .then(jobs => {
        
        res.render(`index`, {
          jobs, search
        });
      })

  }

});

// Jobs routes
app.use(`/jobs`, require(`./routes/jobs`))
