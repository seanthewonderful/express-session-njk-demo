import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'

const app = express()
const PORT = 5555

// Configurations
app.use(express.urlencoded({ extended: false }))
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "sean"
}))
nunjucks.configure('views', {
    autoescape: true,
    express: app,
})

// Routes
app.get('/', (req, res) => {

    if (req.session.username) {
        res.render('index.html', { username: req.session.username })
    } else {
        res.render('index.html')
    }

})

const myArray = ["Pizza", "Hot dogs", "Tacos", "America"]

const myObject = {
    food: {
        key1: "pizza",
        key2: "cupcakes"
    },
    country: {
        key1: "myValue",
        key2: "myValue2"
    },
    car: {
        key1: "value1",
        key2: "value2"
    }
}

app.get('/profile', (req, res) => {

    res.render('profile.html', { myObj: myObject })

    // if (myArray) {
    //     res.render('profile.html', { array: myArray })
    // } else {
    //     res.render('profile.html')
    // }
})

app.post('/login', (req, res) => {

    const { username, password } = req.body
    req.session.username = username
    req.session.password = password

    // console.log(req.session)

    res.redirect('/')

})

// Listen
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))