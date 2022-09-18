const express=require('express')
const router=express.Router()



router.get('/', (req,res)=>
{
    res.render('users/login',{ layout : 'layouts/loginlayout' })
})

router.get('/go', (req,res)=>
{
    res.render('/index')
})

module.exports=router

