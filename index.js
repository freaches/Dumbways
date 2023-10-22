const express = require('express')
const path = require('path')
const { prependListener } = require('process')
const app = express()
const port = 5000
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')

const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require("sequelize")
const sequelize = new Sequelize(config.development)

let days =""
let months = ""

const project = [{
    title : "Mukbangs App",
    images : "/Image/makanan.jpg",
    duration : "2 Bulan",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    techs : [
        `<i class="fa-brands fa-node-js"></i>`,    
        `<i class="fa-brands fa-react"></i>`,
        `<i class="fa-brands fa-vuejs"></i>`,
        `<i class="fa-brands fa-js"></i>`
    ]
}]


app.set ('view engine', 'hbs')
app.set ('views', path.join(__dirname, 'src/views'))


app.use(express.static('src/assets'))

app.use(express.urlencoded({ extended : false}))

app.use(flash())

app.use(session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: 'kingking'
  })
)

app.get('/', home)
app.get('/testimonial',testimonial)
app.get('/contact-me',contactMe)
app.get('/my-project-detail/:id',myProject)
app.get('/add-my-project',formMyProject)
app.get('/edit-project/:id',showEditProject)
app.get('/delete-project/:id',deleteProject)
app.post('/add-my-project',addMyProject)
app.post('/edit-project/:id',editProject)
app.get('/register', formRegister)
app.post('/register', addUser)
app.get('/login', formLogin)
app.post('/login', userLogin)



app.listen(port, () => {
    console.log ("Server running on port 5000")
})

async function home (req, res) {
    try{
    const query = `SELECT id, title, description, start_date, end_date, technologies FROM projects`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
   
    // const project = [];

    obj.forEach(function(item){
        let techs = []
        waktu(item.start_date, item.end_date)
        if (months > 0) {
            item.duration = months + " Bulan"
        } else if ( days > 0)
        {
            item.duration = days + " Hari"
        }
        for (let i = 0 ; i<4 ; i++){
            if (item.technologies[i] == "Node Js") {
                techs.push(`<i class="fa-brands fa-node-js"></i>`)
            }
            else if (item.technologies[i] == "React Js") {
                techs.push(`<i class="fa-brands fa-react"></i>`)
            }
            else if (item.technologies[i] == "Next Js") {
                techs.push(`<i class="fa-brands fa-vuejs"></i>`)
            }
            else if (item.technologies[i] == "Type Script") {
                techs.push(`<i class="fa-brands fa-js"></i>`)
            }
        }
        item.techs = techs
        
    })

    const project = obj.map((res) => ({
      ...res,
      author: "Mang Jalak"
    }))
    console.log(project)
    res.render('index' , {content : project,
        isLogin: req.session.isLogin,
        user: req.session.user
      })
    } catch(err) {

    }
}

function testimonial (req, res) {
    res.render('testimonial')
}

function contactMe (req, res) {
    res.render('contact-me')
}

async function showEditProject(req,res){
    try{
        const { id } = req.params

        const query = `SELECT * FROM projects WHERE id =${id}`
        let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
        const data = obj.map((res) => ({
            ...res
          }))
        res.render('edit-my-project',{content:data[0]})
    } catch(error){
        console.log(error)
    }
}

async function myProject (req, res) {
    try {
    const { id } = req.params
    
    const query = `SELECT * FROM projects WHERE id =${id}`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT })

    obj.forEach(function(item){
        let tech1 = []
        let tech2 = []

        waktu(item.start_date, item.end_date)
        if (months > 0) {
            item.duration = months + " Bulan"
        } else if ( days > 0)
        {
            item.duration = days + " Hari"
        }

        for (let i = 0 ; i<4 ; i++){
            if (item.technologies[i] == "Node Js") {
                tech1.push(`<i class="fa-brands fa-node-js">&nbsp Node js</i>`)
            }
            else if (item.technologies[i] == "React Js") {
                tech1.push(`<i class="fa-brands fa-react">&nbsp React js</i>`)
            }
            else if (item.technologies[i] == "Next Js") {
                tech2.push(`<i class="fa-brands fa-vuejs">&nbsp Next js</i>`)
            }
            else if (item.technologies[i] == "Type Script") {
                tech2.push(`<i class="fa-brands fa-js">&nbsp Type Script</i>`)
            }
        }
        item.tech1 = tech1
        item.tech2 = tech2
        
    })

    const data = obj.map((res) => ({
      ...res,
      author: "Mang Jalak"
    }))
    console.log(project)
    res.render('my-project-detail' , {content : data[0]})
    } catch(err) {

    }
    
}

function formMyProject (req, res) {
    res.render('add-my-project')
}

async function addMyProject (req, res) {
    try{
    
    let image = "image.jpg"
    
    
    let { title, start_date, end_date, description, node, react, next, script} = req.body
    console.log(title)
    console.log(start_date)
    console.log(end_date)
    console.log(description)
    console.log(node)
    console.log(react)
    console.log(next)
    console.log(script)
    console.log(image)
    
    const query = `INSERT INTO projects (title, start_date, end_date, image, description, technologies, "createdAt", "updatedAt") VALUES ('${title}', '${start_date}','${end_date}', '${image}','${description}', ARRAY['${node}','${react}','${next}','${script}'], NOW(), NOW())`
    await sequelize.query(query)

    res.redirect('/')

    } catch(error){
        console.log(error)
    }

}

async function deleteProject (req, res){
    try{
        const { id } = req.params

        await sequelize.query(`DELETE FROM projects WHERE id = ${id}`)

        res.redirect('/')
    } catch(error){
        console.log(error)
    }
}

async function editProject (req, res) {
    try{
        const { id } = req.params

        let image = "image.jpg"
        
        
        let { title, start_date, end_date, description, node, react, next, script} = req.body
        console.log(title)
        console.log(start_date)
        console.log(end_date)
        console.log(description)
        console.log(node)
        console.log(react)
        console.log(next)
        console.log(script)
        console.log(image)
        
        const query = `UPDATE projects 
        SET title = '${title}', start_date = '${start_date}', end_date = '${end_date}', image = '${image}', description = '${description}', technologies =  ARRAY['${node}','${react}','${next}','${script}'], "createdAt" = NOW(), "updatedAt" = NOW() WHERE ID=${id}`
        await sequelize.query(query)
    
        res.redirect('/')
    
        } catch(error){
            console.log(error)
        }
}

function waktu (awal,akhir){
    let dataStart = new Date (awal)
    let dataEnd = new Date (akhir)
    let oneDay = 1000 * 3600 * 24

    let selisih = dataEnd.getTime() - dataStart.getTime()
    let totaldays = selisih/oneDay
    months  = Math.floor (totaldays/30)
    days = totaldays % 30
}

function formRegister(req, res) {
    res.render('register')
}

async function addUser(req, res) {
    try {
      const { name, email, password } = req.body
  
      await bcrypt.hash(password, 10, (err, hashPassword) => {
        const query = `INSERT INTO users (name, email, password, "createdAt", "updatedAt") VALUES ('${name}', '${email}', '${hashPassword}', NOW(), NOW())`
        
        sequelize.query(query)
      })
      res.redirect('/login')
    } catch (err) {
      throw err
    }
  }
  
  function formLogin(req, res) {
    res.render('login')
  }

  async function userLogin(req, res) {
    try {
      const { email, password } = req.body
      const query = `SELECT * FROM users WHERE email = '${email}'`
      let obj = await sequelize.query(query, { type: QueryTypes.SELECT })
  
      if(!obj.length) {
        req.flash('danger', "user has not been registered")
        return res.redirect('/login')
      }
  
      await bcrypt.compare(password, obj[0].password, (err, result) => {
        if(!result) {
          req.flash('danger', 'password wrong')
          return res.redirect('/login')
        } else {
          req.session.isLogin = true,
          req.session.user = obj[0].name
          req.flash('success', ' login success')
          req.flash('danger', 'password wrong')
          return res.redirect('/')
        }
      })
  
    } catch (err) {
      throw err
    }
  }