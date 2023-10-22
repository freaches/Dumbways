
const express = require('express')
const path = require('path')
const { prependListener } = require('process')
const app = express()
const port = 5000

let days =""
let months = ""

const project = [{
    title : "Mukbangs App",
    images : "/Image/makanan.jpg",
    duration : "2 Bulan",
    desc : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
app.get('/my-project-detail',myProject)
app.get('/add-my-project',formMyProject)
app.post('/add-my-project',addMyProject)
app.get('/delete-project/:id',deleteProject)
app.get('/edit-project/:id',editProject)

app.listen(port, () => {
    console.log ("Server running on port 5000")
})

function home (req, res) {
    res.render('index' , {content : project})
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

    let techs = []
    let duration = ""

    let { title, start, end, desc, node, react, next, script, image} = req.body
    console.log(title)
    console.log(start)
    console.log(end)
    console.log(desc)
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
        techs.push(`<i class="fa-brands fa-node-js"></i>`)
    }
    if (react) {
        techs.push(`<i class="fa-brands fa-react"></i>`)
    }
    if (next) {
        techs.push(`<i class="fa-brands fa-vuejs"></i>`)
    }
    if (script) {
        techs.push(`<i class="fa-brands fa-js"></i>`)  
    }
    

    const data =  {
        title,
        duration,
        desc,
        techs
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
    console.log(id);
    
    
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