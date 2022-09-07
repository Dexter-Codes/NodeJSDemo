const express=require('express')
const router=express.Router()
const book=require('../models/book')

router.get('/',async (req,res)=>
{
    let books
    try 
    {
     books =await book.find().sort({createdBy: desc}).limit(10).exec()   
    } 
    catch
    {1
        books=[]
    }
    res.render('index', {books:books})
})

module.exports=router