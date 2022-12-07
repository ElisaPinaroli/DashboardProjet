
//connait toutes fonctions express
const express = require('express');
const app = express();
//require('./models/dbConfig');
const postsRoutes = require('./routes/touriste');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
//mongoose.set('useFindAndModify', false);
const cors = require('cors'); //rend api accessible depuis n'importe ou

const mongoose = require('mongoose');

//se connecter a BDD
mongoose.connect(
    "mongodb://localhost:27017/api",
    { useNewUrlParser: true, useUnifiedTopology: true, family : 4,},
    (err) => {
        if(!err) console.log("mongodb connected");
        else console.log("connection err :" + err);
    }
)


app.use(bodyParser.json());
//si le chemin c'est juste l'entrée, connexion au router

//app.use(cors()); //donne access a tout le monde
app.use(cors({origin: 'http://localhost:3000'})); //autorise access a l'api a localhost3000 --> frontend en react
app.use('/touristes', postsRoutes);

//connecter au serveur
app.listen(5500, () => console.log('server started : 5500'));




