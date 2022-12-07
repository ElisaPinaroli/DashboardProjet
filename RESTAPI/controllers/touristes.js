const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/touristes');

router.get('/', (req, res) => {
    PostsModel.find((err, touristes) => {
        if (!err) res.status(200).send(touristes);
        else console.log("error to get data : " + err);
        console.log(touristes);
    })
})

router.get('/:continent', (req, res) => {
    let continent = req.params.continent;
    //console.log("continent: ", continent)
    PostsModel.find({ continent }, function(err, docs) {
        if (!err) {
            res.status(200).send(docs);
            //console.log("docs :", docs)
        } else console.log("delete error : " + err);
    });
});

// il faut un contrôle pour ne pas avoir 2 continents avec le même nom
// 1- fonction get ==> sauvegarder la liste des continents
// 2- faire une boucle et vérifier que le continent n'est pas dans la liste.


//creer
//http://localhost:5500/touristes/
router.post('/', (req, res) => {
    console.log(req.body);
    const newRecord = new PostsModel({
        continent: req.body.continent,
        tauxTouriste: req.body.tauxTouriste
    });

    newRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log("error creating new data : " + err);

    })
});







//modifier
router.put("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    const updateRecord = {
        continent: req.body.continent,
        tauxTouriste: req.body.tauxTouriste
    };

    PostsModel.findByIdAndUpdate(
        req.params.id, { $set: updateRecord }, { new: true },
        (err, docs) => {
            if (!err) res.send(docs)
            else console.log("Update error : " + err);

        }
    );
})

//delete
router.delete("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id)
    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("delete error : " + err);
        }
    );
});

module.exports = router;