const mongoose=require('mongoose');
//pass=process.env.PASSWORD
const url='mongodb+srv://admin-joe:admin123@db1.kibsb.mongodb.net/checkSpense';
mongoose.connect(url,{useUnifiedTopology: true});

const connection=mongoose.connection;

connection.on('error', err=>console.log(err));
connection.on('connected', ()=>console.log('MongoDB connected'));