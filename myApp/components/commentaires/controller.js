//jamais testé

import mongoose from "mongoose";
import Commentaires from "./model"

exports.get = async (req, res) => {

    const commentaire = await Commentaires.find();
    res.status(200).send(commentaire);
};

exports.getById = async (req, res) => {
    //id = string
    const id = req.params.id;
    await Commentaires.findOne({ "_id": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};

exports.post = (req, res) => {
    const collection = db.collection('commentaires');
   console.log(req.body);
    const post = {
        commentaire: req.body.commentaire,
        post: req.body.post,
        auteur: req.body.auteur
       },
    };
    collection.save(post);
   return res.status(201).send({
       post
   });
};
