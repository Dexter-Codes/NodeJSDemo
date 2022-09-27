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

router.get('/logout',(req,res)=>
{
        // req.logOut((err)=>{
        //     if(err)
        //     {
        //         return next(err)
        //     }
        //     res.redirect('/login')
        // })
        // req.session.user = null
        // req.session.save(function (err) {
        //   if (err) next(err)
        console.log(req.session)
        req.session.destroy((err)=>{
            if(err)
            {
                return console.log(err)
            }
            res.redirect('/')
        })
          
    })

module.exports=router