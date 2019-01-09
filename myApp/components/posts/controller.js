import mongoose from "mongoose";
import Posts from "./model"

exports.get = async (req, res) => {
       
    const posts = await Posts.find();
    res.status(200).send(posts);
};

exports.getById = async (req, res) => {
    //id = string
    const id = req.params.id;
    await Posts.findOne({ "_id": new mongoose.Types.ObjectId(id) }, function (err, doc) {
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
        auteur: req.body.auteur,
        img: req.body.img,
        texte: req.body.texte
    };
    Posts.create(post);
    return res.status(201).send({ post });
};

