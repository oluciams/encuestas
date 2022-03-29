const Survey = require('../models/modelSurvey')
const app = require('../index')


const getHome = (req, res)=>{    
    res.render('index')  
    // res.render('index' )       
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
        res.render("index", {
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
            res.redirect('/surveys')
        }catch (error) {
            throw new Error(error)
        }
    }    
}

const showSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find({user: res.locals.user});
        res.render('surveys', { surveys })
    }catch (error) {
        throw new Error(error)
    }
}

const voteSurvey = async (req, res) => {
    try {
        const surveys = await Survey.find({user: res.locals.user});
        res.render('vote', {surveys})
    }catch (error) {
        throw new Error(error)
    }
}

const showResults = async (req, res) => {
    try {
        const surveys = await Survey.find({user: res.locals.user});
        res.render('results', {surveys})
    }catch (error) {
        throw new Error(error)
    }
}

const deleteSurvey = async (req, res) => {
    try {        
        const { id } = req.params;
        await survey.deleteOne({_id:id }) 
        req.flash('success_msg', 'Survey deleted successfully')           
        res.redirect('/surveys')
    }catch (error) {
        throw new Error(error)
    }
}


// const updateStatus =  async(req, res)=>{

   
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
    getHome,
    createSurvey,
    showSurveys,
    voteSurvey,
    showResults,
    deleteSurvey 
    // updateStatus    
}