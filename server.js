
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Resume = require('./models/Resume');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(
    'mongodb://misba:misba1234@ac-pwxna8u-shard-00-00.2f3rycy.mongodb.net:27017,ac-pwxna8u-shard-00-01.2f3rycy.mongodb.net:27017,ac-pwxna8u-shard-00-02.2f3rycy.mongodb.net:27017/resumeDB?ssl=true&replicaSet=atlas-gbu1j0-shard-0&authSource=admin&appName=Cluster0'
)
.then(() => {
    console.log('MongoDB Connected Successfully');
})
.catch((err) => {
    console.log('MongoDB Connection Error:', err);
});

// Home Route
app.get('/', (req, res) => {
    res.render('index');
});

// Save Resume Route
app.post('/save', async (req, res) => {

    try {

        const newResume = new Resume({

            name: req.body.name,

            email: req.body.email,

            skills: req.body.skills,

            education: req.body.education,

            experience: req.body.experience

        });

        await newResume.save();

        res.send('Resume Saved Successfully!');

    } catch (error) {

        console.log(error);

        res.send('Error Saving Resume');

    }

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});