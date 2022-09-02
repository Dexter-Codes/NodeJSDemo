if(process.env.Node_ENV!=='production')
{
    require('dotenv').config()
}
const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')

const indexRouter=require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose=require('mongoose')
const db=mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true, useCreateIndex : true,useUnifiedTopology : true})
//db.once('error',error=>console.error(error))
db.once('open',()=>console.log('connected to mongoose'))


app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)