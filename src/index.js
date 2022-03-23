'use strict'

//environet variables
require('dotenv').config();

//express
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const cookieSession = require('cookie-session')
const methodOverride = require('method-override');
const flash = require('connect-flash');
const surveyRoutes = require('./routes/survey.routes');
const userRoutes = require('./routes/user.routes');
const surveyApiRoutes = require('./routes/api.survey.routes')

//mongo db connection
require('./configuration/configdb')

//express setting
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//configuracion sesion
app.use(cookieSession({
   name: 'session',
   keys: ['survey_session'],  
   maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(flash())

//variables globales
app.use((req, res, next) =>{
   res.locals.success_msg = req.flash('success_msg')
   res.locals.danger_msg = req.flash('danger_msg')
   next()
})

//para peticiones delete y put
app.use(methodOverride('_method', {methods: ['POST', 'GET']}))

const User = require('../src/models/modelUser')

app.use(async (req, res, next) => {
   const userId = req.session.userId
   if(userId){
       const user = await User.findById(userId)
       if(user){
           res.locals.user = user            
       }else{
           delete req.session.userId
       }
   }
   next()    
})

//Handlebars
app.set('views', path.join(__dirname, 'views'))

app.engine('.hbs', hbs({ 
   runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
   },   
   layoutsDir:path.join(app.get('views'),'layouts'),
   partialsDir:path.join(app.get('views'),'partials'),
   extname:'.hbs',
   defaultLayout:'main'
}))
 
app.set('view engine', 'hbs')

app.use(userRoutes)
app.use(surveyRoutes)
app.use(surveyApiRoutes)

//archivos estaticos imagenes, estilos
app.use(express.static(path.join(__dirname, "public")))

//para ruta no definida
app.get('*', function(req, res, next ){
   res.status(404).render('notFound')
})

//
app.use((err, req, res, next) => {

   if (err.statusCode === 400) {       
       const errors = [];
       errors.push({ text: err.message })
       res.status(err.statusCode).render("register", {
           errors,
       });
   } else {
       res.status(500).render('errors/serverError')
   }   
});


module.exports = app

app.listen(process.env.PORT || 3000, ()=>console.log(`Listening on port ${process.env.PORT || 3000}`));