import mongoose from "mongoose";
import Commentaires from "./model"

//récupère tous les commentaires
exports.get = async (req, res) => {

    const commentaire = await Commentaires.find();
    res.status(200).send(commentaire);
};

//récupère le commentaire correspondant à l'id
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

//enregistre un commentaire
exports.post = (req, res) => {
    console.log(req.body);
    if (!req.body.post) {
        return res.status(400).send({
            message: "post is required"
        })
    }
    if (!req.body.auteur) {
        return res.status(400).send({
            message: "author is required"
        })
    }
    if (!req.body.date) {
        return res.status(400).send({
            message: "date is required"
        })
    }
    const post = {
        commentaire: req.body.commentaire,
        post: req.body.post,
        auteur: req.body.auteur,
        date: req.body.date
    };
    Commentaires.create(post);
    return res.status(201).send({ post });
};

//met à jour un commentaire
exports.update = async (req, res) => {
    console.log(req.body);
    const old = { _id: new mongoose.Types.ObjectId(req.body._id) }
    const post = {
        _id: req.body._id,
        commentaire: req.body.commentaire,
        post: req.body.post,
        auteur: req.body.auteur,
        date: req.body.date
    }
    await Commentaires.update(old, post);
    return res.status(201).send({ post });
};

//récupère l'ensemble des commentaires d'un post
exports.getCommentairesOfPost = async (req, res) => {
    console.log("requete getCommentairesOfPost post");
    const id = req.params.id;
    await Commentaires.find({ "post": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};
