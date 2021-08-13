const express = require('express');
const passport = require('passport')
const cookieParser = require('cookie-parser') 
const session = require('express-session')
const PassportLocal = require('passport-local').Strategy

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser('mi ultra hiper pass'))

app.use(session({
    secret: 'mi ultra hiper pass',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new PassportLocal(function(username, password, done){
if(username === "unsighted" && password == '123')
    return done(null, { id: 1, name: 'Esteban' })

    done(null, false)
}))

passport.serializeUser(function(user, done) {
    done(null.user.id)
})

passport.deserializeUser(function(id, done) {
    done(null, { id: 1, name: 'Esteban' })
})

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
    if(req.isAuthenticated()) return next();

    res.redirect('/login')
}, (req, res)=>{
    res.send('Hola estás logueado!')
})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login'}))

    app.listen(3000, () => console.log('server started'))
