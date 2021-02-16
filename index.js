//  Modules declaration

var express = require("express");
var bodyParser = require("body-parser");
var moongoose = require("mongoose");
// var { check, validationResult} = require("express-validator");

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname + 'public')));
app.use(bodyParser.urlencoded({
    extended:true
}))

// cloud connection

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rimas123: Rimas@123 @cluster0.gpppa.mongodb.net/rimasdb?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("connected to the cloud...");
//   // perform actions on the collection object
//   client.close();
// });


// // cloud connection over





// database area

moongoose.connect('mongodb://localhost:27017/spycrdb',
{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

var db = moongoose.connection;
db.on('error',()=>{console.log("Error in connecting to database");});
db.once('open',()=>{console.log("Connected to Database Successfully");});





app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-origin": '*'
    })
    console.log(__dirname);
    return res.sendFile(__dirname + '/public/html/index.html');
    // res.render('index', {phonenumber: phonenumber})
})

// app.get('/register', (req, res)=> {
//     return res.sendFile(__dirname + '/public/html/register.html');


// })



app.get('/details',(req,res)=>{
    return res.sendFile(__dirname +'/public/html/details.html');
})



// database area for register page //
app.post("/detailshere",





(req,res)=>{

     var email = req.body.email;
     var name = req.body.name;
     var number = req.body.number;
     var need = req.body.need;
console.log(
     email,
     name,
     number,
     need);
     var data = {
         "email" : email,
         "name" : name,
         "number" : number,
         "need" : need,
     }
    

     db.collection('usersDetails').insertOne(data,(err,collection)=>{
         if(err){
             throw err;

         }
         console.log("Record inserted successfully");
     });
     return res.sendFile(__dirname + '/public/html/details.html');

});

// database area for register page over//







// database area for login page //

// app.post('/loginpage',(req,res)=>{
 
//     var email = req.body.email;
//     var password = req.body.password;
//     console.log(email,password);

//     var logindata = {
//           "email" : email,
//           "password" : password

//     };

//     db.collection('login_users').insertOne(logindata,(err,collection)=>{
            
//              if(err)
//              {
//                  throw err;
//              }

//              console.log("Records inserted successfully");


//     });
//          return res.sendFile(__dirname +'/public/html/buy.html');



// });


// database area for login page over //

app.listen(3000);

console.log("listening on port 3000...");