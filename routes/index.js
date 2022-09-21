const express=require('express')
const router=express.Router()
const Book=require('../models/book')

router.get('/',async (req,res)=>
{
    let books
    try 
    {
        books =await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()   
    } 
    catch
    {
        books=[]
    }
    res.render('index', {books:books, name:req.user.name})
})

router.post('/',(req,res)=>
{
    try {
        req.logOut()
        res.redirect('/login')
    } catch (error) {
        console.log(error)
        res.redirect('/home')
    }
   
})

module.exports=router