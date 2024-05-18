const express = require('express')
const app = express()
const userRoute = require('./routes/userRoute');
const trRoute = require('./routes/trRoute');
const path = require('path')
const db = require('./db');
app.use(express.json());
app.use('/api/users/' , userRoute);
app.use('/api/transactions/' , trRoute);

const port =process.env.PORT || 5000

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('./client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, './client/build/index.html'))
     })
}

app.listen(port, () => {
  console.log(`Node JS server started`);
})
