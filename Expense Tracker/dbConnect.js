const mongoose=require('mongoose');
//pass=process.env.PASSWORD
const url='mongodb+srv://Indraudh:Arghya@cluster0.u3vacf7.mongodb.net/ExpanseTracker';
mongoose.connect(url,{useUnifiedTopology: true});

const connection=mongoose.connection;

connection.on('error', err=>console.log(err));
connection.on('connected', ()=>console.log('MongoDB connected'));
