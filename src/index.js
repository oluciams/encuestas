//environet variables
require('dotenv').config();

//express
const express = require('express');
const app = express();


//express setting
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', (req, res)=>{
  res.send('<h1>Hola Mundo </h1>');
});



app.listen(process.env.PORT || 3000, ()=>console.log(`Listening on port ${process.env.PORT || 3000}`));