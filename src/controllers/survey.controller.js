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

const updateVote=  async(req, res)=>{   
    
    try{ 
        const {id} = req.params;

        const  optionSelected = req.body.optionSelected    
       
        let object = await Survey.findById({_id:ObjectId(req.params.id)})        
        let optionsObject = object.options       
        let optionVote = optionsObject.find(element => element.option === optionSelected)       
        let voteValue = await optionVote.vote        
        voteValue += 1

        await Survey.updateOne(
            {'_id': ObjectId(req.params.id), "options.option": optionSelected},
            {$set: {"options.$.vote": voteValue }}                 
        ) 
        
        req.flash('success_msg', 'Survey updated successfully')   
        res.redirect(`/results/${id}`) 
          
    } catch (error) {
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
    updateVote      
}