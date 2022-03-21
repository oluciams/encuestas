//environet variables
require('dotenv').config();

//express
const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');


//express setting
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//mongo db connection
require('./configuration/configdb')

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



app.get('/', (req, res)=>{
  res.render('index');
});



app.listen(process.env.PORT || 3000, ()=>console.log(`Listening on port ${process.env.PORT || 3000}`));