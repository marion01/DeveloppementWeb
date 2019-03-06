import mongoose from "mongoose";
import Commentaires from "./model"

/*
 * Controller for Commentaires
 */


/*
 * Get all comments
 */
exports.get = async (req, res) => {
    const commentaire = await Commentaires.find();
    res.status(200).send(commentaire);
};

/*
 * Get comment corresponding to the id 
 */
exports.getById = async (req, res) => {
    const id = req.params.id;
    await Commentaires.findOne({ "_id": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};

/*
 * Save a new comment
 */
exports.post = (req, res) => {
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

/*
 * Update a comment
 */
exports.update = async (req, res) => {
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

/*
 * Get all comments corresponding to a post
 */
exports.getCommentairesOfPost = async (req, res) => {
    const id = req.params.id;
    await Commentaires.find({ "post": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};
