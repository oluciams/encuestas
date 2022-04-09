const Survey = require('../models/modelSurvey')
const User = require('../models/modelUser')
const app = require('../index')
const { ObjectId } = require('bson')
//const ObjectID = require('mongodb').ObjectID;


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
            res.redirect(`results/${survey.id}`)  
            
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
            let emailLoguedUser = user.email 
            res.render('surveys', { surveys, emailLoguedUser })    

        }else{
            res.render('home', { surveys })
        }         
            
    }catch (error) {
        throw new Error(error)
    }
}

const voteSurvey = async (req, res) => {

    try { 
        // const users = await User.find();             
        // const initSurveys = await Survey.find();
        // const surveys = initSurveys.map(function (survey){
        //     let user = users.find(user => user._id.toString() === survey.user.toString())  
        //     let newsurvey = survey
        //     newsurvey.email = user.email
        //     return newsurvey           
        // })
        const survey = await Survey.findById(req.params.id)              
        res.render('vote', {survey})
        //res.render('vote', {surveys, survey})
       

    }catch (error) {
        throw new Error(error)
    }
}

const showResults = async (req, res) => {
    try {
        // const users = await User.find(); 
        // const initSurveys = await Survey.find();
        // const surveys = initSurveys.map(function (survey){
        //     let user = users.find(user => user._id.toString() === survey.user.toString())  
        //     let newsurvey = survey
        //     newsurvey.email = user.email
        //     return newsurvey           
        // }) 
        const survey = await Survey.findById(req.params.id)              
        res.render('results', {survey})
        //res.render('results', {surveys, survey})
    }catch (error) {
        throw new Error(error)
    }
}

const deleteSurvey = async (req, res) => {
    try {        
        const { id } = req.params;
        await Survey.deleteOne({_id:id })   
        req.flash('success_msg', 'Survey deleted successfully')     
        res.redirect('/')
        
    }catch (error) {
        throw new Error(error)
    }
}

const updateSurvey =  async(req, res)=>{
    try{
        const {id} = req.params;
        //await Survey.findByIdAndUpdate(req.params.id)
        console.log(id)
        //req.flash('success_msg', 'Survey updated successfully')     
        // res.redirect('/results')     
        res.redirect(`/results/${id}`) 
    }catch (error) {
        throw new Error(error)
    }
}

const updateVote=  async(req, res)=>{   
    // let votecheck = req.body.votecheck
    // if(votecheck === "on"){
    //     votecheck = true
        
    // }else {
    //     votecheck = false 
    // }      

    try{  
        await Survey.updateOne(
            {'_id': ObjectId(req.params.id), "options.option": "Medellín"},
            {$set: {"options.$.vote": 1}}
            
        // //    // {title: "prueba 2", "options.option": "Medellín"},
        // //     //{$set: {"options.$.vote": 1}}
        )
        // console.log(id)
        //console.log(ObjectId(req.params.id))
        //console.log(vote)
        
    //const survey = await Survey.findById(req.params.id)
    //    const options = survey.options       
    //    let optionId = options.find(option => option._id.toString() === "624f0373cabda71be066df7b") 
    //    let id = optionId._id.toString()
    //    let voteNew = optionId.vote       
    //     console.log(id)
    //     console.log(voteNew) 
          
          
    }catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    
    showCreateForm,
    createSurvey,
    showSurveys,   
    voteSurvey,
    showResults,
    deleteSurvey,
    updateSurvey,
    updateVote      
}