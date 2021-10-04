const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors())

const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: false}));


app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.send('Hellooooooooooooooooo');
});

const employeeRoutes = require('./src/routes/employee.route');

// create employee routes
app.use('/api/v1/employee', employeeRoutes);


app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
});