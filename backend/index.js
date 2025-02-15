const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const billRoute = require('./routes/bill');
const dashboardRoute = require('./routes/dashboard');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));  // Corrected 'extends' to 'extended'
app.use(express.json());
app.use('/user', userRoute); 
app.use('/category', categoryRoute); 
app.use('/product', productRoute); 
app.use('/bill', billRoute); 
app.use('/dashboard', dashboardRoute); 

const port = 8081;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
