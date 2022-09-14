const express=require('express')
const router=express.Router()
const Author=require('../models/author')
const Book = require('../models/book')


router.get('/',async (req,res)=>
{
    res.render('/users/login')
})

router.post('/',async (req,res)=>
{
    res.render('/home')
})

