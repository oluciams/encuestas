const Survey = require('../models/modelSurvey')
const User = require('../models/modelUser')
const app = require('../index')

const showCreateForm = async (req, res) => {
    try {       
        res.render('createSurvey')    
    }catch (error) {
        throw new Error(error)
    }
}

const createSurvey = async (req,res)=>{    
    const { title, description, option1, option2 } = req.body;
    const errors = []

    if (!title) {
        errors.push({ text: "Please Write a Title." });
      }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
      }
    if (errors.length > 0) {
        res.render('createSurvey', {
          errors,
          title,
          description,
        })
    } else {
        try{
            const options = []
            options.push({option: option1})
            options.push({option: option2})
            
            const survey = new Survey({title, description, options, user: res.locals.user});
            await survey.save();                
            req.flash('success_msg', 'Survey added successfully')
            res.redirect('/results')
            
        }catch (error) {
            throw new Error(error)
        }
    }    
}

const showSurveys = async (req, res) => {
    
    try {    
        const users = await User.find();
        const initSurveys = await Survey.find();        

        const surveys = initSurveys.map(function (survey){
            let user = users.find(user => user._id.toString() === survey.user.toString())  
            let newsurvey = survey
            newsurvey.email = user.email
            return newsurvey           
        })
        const user = res.locals.user
        if(user){
            res.render('surveys', { surveys })    

        }    else{
            res.render('home', { surveys })

        }         
            
    }catch (error) {
        throw new Error(error)
    }
}

const voteSurvey = async (req, res) => {

    try { 
        const users = await User.find();       
        const initSurveys = await Survey.find();
        const surveys = initSurveys.map(function (survey){
            let user = users.find(user => user._id.toString() === survey.user.toString())  
            let newsurvey = survey
            newsurvey.email = user.email
            return newsurvey           
        })              
        res.render('vote', {surveys})

    }catch (error) {
        throw new Error(error)
    }
}

const showResults = async (req, res) => {
    try {
        const users = await User.find(); 
        const initSurveys = await Survey.find();
        const surveys = initSurveys.map(function (survey){
            let user = users.find(user => user._id.toString() === survey.user.toString())  
            let newsurvey = survey
            newsurvey.email = user.email
            return newsurvey           
        })              
        res.render('results', {surveys})
    }catch (error) {
        throw new Error(error)
    }
}

const deleteSurvey = async (req, res) => {
    try {        
        const { id } = req.params;
        await Survey.deleteOne({_id:id })
        // const surveys = await Survey.find({user: res.locals.user}); 
        // await Survey.deleteOne({_id:id}) 
       
        req.flash('success_msg', 'Survey deleted successfully')     
        res.redirect('/')
        
    }catch (error) {
        throw new Error(error)
    }
}


const updateVote =  async(req, res)=>{
   
    let votecheck = req.body.votecheck  

    if(votecheck === "on"){
        votecheck = true
    }else {
        votecheck = false 
    }  

    console.log(votecheck)

    try{     
       await Survey.findByIdAndUpdate(req.params.id, {vote: votecheck})      
        res.redirect('/results')        
    }catch (error) {
        throw new Error(error)
    }
}

//const updateStatus =  async(req, res)=>{

   
    //     let statuscheck = req.body.statuscheck  
    
    //     if(statuscheck === "on"){
    //         statuscheck = true
    //     }else {
    //         statuscheck = false 
    //     }  
    
    //     try{     
    //        await Task.findByIdAndUpdate(req.params.id, {status: statuscheck})      
    //         res.redirect('/tasks')        
    //     }catch (error) {
    //         throw new Error(error)
    //     }
    // }

module.exports = {
    
    showCreateForm,
    createSurvey,
    showSurveys,   
    voteSurvey,
    showResults,
    deleteSurvey, updateVote
    // updateStatus    
}