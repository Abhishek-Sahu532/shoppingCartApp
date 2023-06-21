const express = require('express');
const app = express();
const productRoutes = require('./routes/products')

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = 4000;

app.use('/api/v1/', productRoutes)
app.listen(PORT, ()=>{
  console.log('App is running on port ', PORT)
})



