const express=require('express')
const brcypt=require('bcryptjs')
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy


const router=express.Router()
const User = require('../models/user')


// initializePassport(
//     passport,
//     email=>await User.find(user=>user.email===email),
//     id=>await User.find(user=>user.id===id)
// )

router.get('/', checkAuthenticated, (req,res)=>
{
    res.render('users/landingpage',{ layout : 'layouts/loginlayout' })
})

router.get('/login',checkNotAuthenticated, (req,res)=>
{
    res.render('users/login',{ layout : 'layouts/loginlayout', user : new User()  })
})

router.post('/login',checkNotAuthenticated, passport.authenticate('local',
{
    successRedirect:'/home',
    failureRedirect:'/login',
    failureFlash:false
}),(req,res)=>
{
    initialize(passport,
        async email=>await User.find({email : req.body.email}),
        async id=>await User.find({id : email.id}))
})

router.get('/register', checkNotAuthenticated,(req,res)=>
{
    res.render('users/register',{ layout : 'layouts/loginlayout', user : new User() })
})

router.post('/register',checkNotAuthenticated, async(req,res)=>
{
    try 
    {
        const hashedPassword = await brcypt.hashSync(req.body.password,10)
        const user=new User(
            {
                email:req.body.email,
                password:hashedPassword,
                name:req.body.name
            }

        )

        user.save()
        res.redirect('/login')
        
    } 
    catch 
    {
        res.redirect('/register')
    }
})

router.get('/go', (req,res)=>
{
    res.redirect('/home')
})


 async function initialize(passport,getUserByEmail,getUserById)
{
    const authenticateUser=async (email,password,done)=>{
        const user= getUserByEmail(email)
        if(user==null)
        {
            return done(null,false,{message:'No user with that email'})
        }

        try 
        {
            console.log(user.email)
            console.log(user.password)
            console.log(password)
            if(await brcypt.compareSync(password,user.password))
            {
                return done(null,user)
            }
            else
            {
                return done(null,false,{message:'Password Incorrect'})
            }    
        } 
        catch (e) 
        {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField:'email', passwordField:'password'},authenticateUser))
    passport.serializeUser((user,done)=>done(null,user.id))
    passport.deserializeUser((id,done)=>{
        return done(null,getUserById(id))
    })
}

function checkAuthenticated(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req,res,next)
{
    if(req.isAuthenticated())
    {
       res.redirect('/home')
    }
    next()
}

module.exports=router

