const express = require('express');
const cors  = require('cors');
const dotenv = require('dotenv');
const {errorHandler,notFound} = require('./middlewares/errorHandler/errorHnadler');
const { urlencoded } = require('express');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors());

// create application/json parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//routes
const userRoutes = require('./router/User/userRoute');
const productRoutes = require('./router/Product/productRoute');
const categoryRoutes = require('./router/Category/categoryRoute');


// connect mongodb
require('./config/DatabaseConnect/mongodb');


// user route
app.use('/',userRoutes);
app.use('/',productRoutes);
app.use('/',categoryRoutes);
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

