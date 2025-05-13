const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const approuter = require('./router/authRoutes');
const cors = require('cors');


app.use(express.json());
app.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;

require('./models/dbconfig');
app.use(bodyParser.json());
app.use('/api', approuter);


app.get('/', (req, res) => {
    res.send("Hello from server");
});
app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});


