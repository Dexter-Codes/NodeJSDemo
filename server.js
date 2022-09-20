if(process.env.Node_ENV!=='production')
{
    require('dotenv').config()
}
const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const bodyParser=require('body-parser')
const methodOverride=require('method-override')
const flash=require('express-flash')
const session=require('express-session')
const passport=require('passport')


const indexRouter=require('./routes/index')
const authorRouter=require('./routes/authors')
const bookRouter=require('./routes/books')
const userRouter=require('./routes/users')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

const mongoose=require('mongoose')
const db=mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useUnifiedTopology : true})
//db.on('error',error=>console.error(error))
//db.once('open',()=>console.log('connected to mongoose'))

app.use('/home',indexRouter)
app.use('/authors',authorRouter)
app.use('/books',bookRouter)
app.use('/',userRouter)


app.listen(process.env.PORT || 3000)