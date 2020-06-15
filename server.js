const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

var corsOptions = {

    origin:true

}

app.use(cors(corsOptions))
// to make all requests of type json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// sync db 
const db = require('./models')
const Role = db.role
function initial(){
    Role.create({
        id:1,
        name:'user'
            
    })
    Role.create({
        id:2,
        name:'admin'
            
    })
    Role.create({
        id:3,
        name:'moderator'
            
    })
}
initial()

db.sequelize.sync()


app.get('/',(req,res)=>{

    res.json({ messege: "Welcome to Express Server" })
})

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/todolist.routes')(app);

const PORT = process.env.PORT || 8080
app.listen(PORT, () =>{

    console.log(`Server running on ${PORT}`)
})




