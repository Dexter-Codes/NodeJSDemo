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

router.post('/logout',(req,res,next)=>
{
        req.logOut((err)=>{
            if(err)
            {
                return next(err)
            }
            res.redirect('/login')
        })
    })

module.exports=router