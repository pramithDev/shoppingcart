const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db , { useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Use Routes
app.use('/api/items', items);

// SERVE STATIC ASSETS IF IN PRODUCTION
if(process.env.NODE_ENV === 'production'){
    //SET STATIC FOLDER
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server started on port ${port}`));