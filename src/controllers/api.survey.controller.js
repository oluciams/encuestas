const Survey = require('../models/modelSurvey')

const createSurvey = async (req,res)=>{
    const { title, description } = req.body;
    try{
        const survey = new Survey({title, description});
        await survey.save()
        res.status(200).json(survey)    
    }catch (error) {
        res.status(400).json({error })
    }
}  

const showSurveys = async (req, res) => {
  try {
      const surveys = await Survey.find();
      res.status(200).json(surveys)
  }catch (error) {
      res.status(400).json({ error })
  }
}

// const updateStatus =  async(req, res)=>{
//     const {id} = req.params
//     let {status} = req.body
//     console.log(status)
    
//     try{     
//         await Task.findByIdAndUpdate(id, {status})
//         res.status(200).json({message: true})       
//     }catch (error) {
//         res.status(400).json(error)
//     }
// }

deleteSurvey = async (req, res) => {
    try {        
        const { id } = req.params;
        await Survey.deleteOne({_id:id }) 
        res.status(200).json({message: true})
    }catch (error) {
        res.status(400).json({message: false})
    }
}

module.exports = {
  createSurvey,
  showSurveys,
  deleteSurvey    
}
