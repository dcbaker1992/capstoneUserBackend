const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
var bodyParser = require('body-parser')

//database configure
require('./config/mongoose.config');

// middlewares
app.use(express.json(), express.urlencoded({extended:true}))

//cors
app.use(cors({
    origin: '*',
    credentials:true
}));

//passport
const passport = require('passport')
var session = require('express-session');

app.use(session({
    name:'mycookie.sid',
    resave:false,
    saveUninitialized:false,
    secret:'secret',
    cookie:{
        maxAge:36000000,
        httpOnly:false,
        secure:false
    }
}));
require('./passport.config');
app.use(passport.initialize());
app.use(passport.session());

//routers
const routers = require('./routes/userRoutes.js')
app.use('/users', routers)

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json())


  

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
    })
