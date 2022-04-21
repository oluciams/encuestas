const User = require('../models/modelUser')
//const app = require ('../index')

//1
const createUserForm = (req,res)=>{      
    res.render('register')    
}

const createUser = async(req,res)=>{
    try{ 
        const user = await User.create({
            email: req.body.email,
            password: req.body.password
        })
        const userEmail = req.body.email
        console.log(userEmail)
        req.flash('success_msg', 'User registered successfully')
        res.redirect('/login')        
    }catch (error) {
        throw new Error(error)
    }
}

const loginUserForm = (req,res)=>{
    res.render('login')
}

const loginUser = async(req,res)=>{
    try{
        const user = await User.authenticate(req.body.email, req.body.password)
        if(user){
            req.session.userId = user._id
            req.flash('success_msg', 'User logged in successfully')   
            return res.redirect('/')
        }else{
            req.flash('danger_msg', 'wrong email or password. Try again!')
            res.redirect('/login')
        }            
    }catch (error) {
        throw new Error(error)
    }
}

const logoutUser = (req,res)=>{
    
    req.session = null    
    res.clearCookie('session')
    res.clearCookie('session.sig')      
    res.redirect('/')
}

module.exports = {  
    createUserForm,
    createUser,
    loginUserForm,
    loginUser,
    logoutUser,   
}
