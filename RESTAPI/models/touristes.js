const mongoose = require("mongoose");
//cree model de BDD
const PostsModel = mongoose.model(
    "api",
    {
        continent : {
            type : String,
            required : true
        },
        tauxTouriste : {
            type : String,
            required : true
            },
        
    },
    "touristes" //table
);

module.exports = {PostsModel}; //acces a postsmodel depuis toute l'appli
