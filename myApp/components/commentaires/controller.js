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
    console.log(req.body);
    const post = {
        commentaire: req.body.commentaire,
        post: req.body.post,
        auteur: req.body.auteur
    };
    Commentaires.create(post);
    return res.status(201).send({ post });
};

exports.update = async (req, res) => {
    console.log(req.body);
    const old = { _id: new mongoose.Types.ObjectId(req.body._id) }
    const post = {
        _id: req.body._id,
        commentaire: req.body.commentaire,
        post: req.body.post,
        auteur: req.body.auteur
    }
    await Commentaires.update(old, post);
    return res.status(201).send({ post });
};
