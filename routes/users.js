const express=require('express')
const router=express.Router()



router.get('/', (req,res)=>
{
    res.render('/users/login')
})

router.post('/', (req,res)=>
{
    res.render('/home')
})

module.exports=router

