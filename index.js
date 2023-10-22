const express = require('express')
const path = require('path')
const { prependListener } = require('process')
const app = express()
const port = 5000

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

app.get('/', home)
app.get('/testimonial',testimonial)
app.get('/contact-me',contactMe)
app.get('/my-project-detail/;id',myProject)
app.get('/add-my-project',formMyProject)
app.post('/add-my-project',addMyProject)
app.get('/delete-project/:id',deleteProject)
app.get('/edit-project/:id',editProject)

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

    // for (let i = 0 ; i<obj.length ; i++){
    //     console.log(obj[i])
    // }

    const project = obj.map((res) => ({
      ...res,
      author: "Mang Jalak"
    }))
    console.log(project)
    res.render('index' , {content : project})
    } catch(err) {

    }
}
function testimonial (req, res) {
    res.render('testimonial')
}
function contactMe (req, res) {
    res.render('contact-me')
}
function myProject (req, res) {
    res.render('my-project-detail')
}
function formMyProject (req, res) {
    res.render('add-my-project')
}

function addMyProject (req, res) {

    let technologies = []
    let duration = ""

    let { title, start_date, end_date, description, node, react, next, script, image} = req.body
    console.log(title)
    console.log(start_date)
    console.log(end_date)
    console.log(description)
    console.log(node)
    console.log(react)
    console.log(next)
    console.log(script)
    console.log(image)

    // image = image.arrayBuffer();
    
    // const images = Buffer.from(image).toString("base64");
    // const images = URL.createObjectURL (image[0])

    waktu(start,end)

    if (months > 0) {
        duration = months + " Bulan"
    } else if ( days > 0)
    {
        duration = days + " Hari"
    }

    if (node) {
        techns.push(`<i class="fa-brands fa-node-js"></i>`)
    }
    if (react) {
        techns.push(`<i class="fa-brands fa-react"></i>`)
    }
    if (next) {
        techns.push(`<i class="fa-brands fa-vuejs"></i>`)
    }
    if (script) {
        techns.push(`<i class="fa-brands fa-js"></i>`)  
    }
    

    const data =  {
        title,
        duration,
        description,
        technologies
        // images
    }

    project.unshift(data)

    res.redirect('/')
}

function deleteProject (req, res){
    const { id } = req.params
    console.log(id);
  
    project.splice(id, 1)
    res.redirect('/')
}

function editProject (req, res) {
    const { id } = req.params
    
    res.render('add-my-project')
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

function renderIcon(icon) {
    if (icon.technologies) {
        technologies.push(`<i class="fa-brands fa-node-js"></i>`)
    }
    if (react) {
        technologies.push(`<i class="fa-brands fa-react"></i>`)
    }
    if (next) {
        technologies.push(`<i class="fa-brands fa-vuejs"></i>`)
    }
    if (script) {
        technologies.push(`<i class="fa-brands fa-js"></i>`)  
    }
}