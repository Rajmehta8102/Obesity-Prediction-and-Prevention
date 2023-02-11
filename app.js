const express = require('express');
const mongoose = require('mongoose');
const {spawn} = require('child_process');
const user = require('./models/User');
const form = require('./models/form');
const Bmi = require('./models/bmi');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.listen(3000);

const dbURL = 'mongodb+srv://RajMehta:Raj@cluster0.6lcrqja.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=> console.log('DB connected'))
.catch((err) => console.log('DB notconnected'))

app.get('/',(req,res)=>{
    res.render('login')
})
app.get('/form',(req,res)=>{
   res.render('form');
})
app.get('/signup',(req,res)=>{
    res.render('signup');
  })
app.post('/',(req,res) =>{
    const User = new user(req.body)
    User.save()
    .then((result) => {
        res.render('form')
      })
      .catch((err)=>{
        console.log(err);
      })
})
app.post('/form',(req,res) =>{
    const Form = new form(req.body)
    Form.save()
    .then((result) => {
      const python = spawn('python', ['script3.py']);
      python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
       if(dataToSend == 1){ 
          res.render('underweight');
       }
       else if(dataToSend == 2){
        res.render('normal');
       }
       else if(dataToSend == 3){
        res.render('overweight');
       }
       else{
        res.render('Obese');
       }
       });
       python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        });
    })
    .catch((err)=>{
      console.log(err);
    })

})
app.post('/signup',(req,res) =>{
    const User = new user(req.body)
    User.save()
    .then((result) => {
        res.render('form')
      })
      .catch((err)=>{
        console.log(err);
      })
})
app.get('/bmi',(req,res)=>{
    res.render('body');
})
app.post('/bmi',(req,res) =>{
    const bmi = new Bmi(req.body)
    bmi.save()
    .then((result) => {
      const python = spawn('python', ['script6.py']);
      python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
       if(dataToSend == 1){ 
          res.render('underweight');
       }
       else if(dataToSend == 2){
        res.render('normal');
       }
       else if(dataToSend == 3){
        res.render('overweight');
       }
       else{
        res.render('Obese');
       }
       });
       python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        });
    })
    .catch((err)=>{
      console.log(err);
    })
})
