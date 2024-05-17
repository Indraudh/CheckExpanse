const mongoose=require('mongoose');
//pass=process.env.PASSWORD
const url='mongodb+srv://indraudhsarkar001:Arghya1234@expansetracker.6b5s1k1.mongodb.net/userdetails';
mongoose.connect(url,{useUnifiedTopology: true});

const connection=mongoose.connection;

connection.on('error', err=>console.log(err));
connection.on('connected', ()=>console.log('MongoDB connected'));