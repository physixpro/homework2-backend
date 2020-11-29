const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors())
// Connect to the mongodb db
mongoose.connect('mongodb+srv://keagan:1234@cluster0.qvhok.mongodb.net/School?retryWrites=true&w=majority', { useNewUrlParser: true,
    useUnifiedTopology: true  } )
const db = mongoose.connection

//listen for any errors, and log them if there are any
db.on('error', console.error.bind(console, 'connection error'));

//Once the db connection is open, we will confirm that everything is up and running
db.once('open', function callback() {
    console.log('database is up and running');
});

//route handler
app.get('/', async (req,res) => {
    //use .find to get the info from the test results
   const testResults = await db.collection('Test_Results').find({}).toArray();
    res.json(testResults)
})

//PORT

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));

