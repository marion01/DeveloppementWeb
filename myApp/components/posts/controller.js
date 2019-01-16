import mongoose from "mongoose";
import Posts from "./model"
import path from "path"

exports.get = async (req, res) => {
    console.log("requete get posts");
    const posts = await Posts.find();
    res.status(200).send(posts);
};

exports.getPostsOfAutor = async (req, res) => {
    console.log("requete getPostsOfAutor post");
    const id = req.params.id;
    await Posts.find({ "auteur.ref": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};

exports.getById = async (req, res) => {
    console.log("requete getById posts");
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

exports.update = async (req, res) => {
    console.log(req.body);
    const old = { _id: new mongoose.Types.ObjectId(req.body._id) }
    const post = {
        _id: req.body._id,
        auteur: req.body.auteur,
        img: req.body.img,
        texte: req.body.texte
    }
    await Posts.update(old, post);
    return res.status(201).send({ post });
};

exports.getImageByPostId = async (req, res) => {
    console.log("requete getImageByPostId posts");
    const id = req.params.id;
    await Posts.findOne({ "_id": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            var reqPath = path.join(__dirname, '../../')
            var file = reqPath + "\\data\\" + doc.img.rel;
            res.download(file); 
        }
    }); 
};

exports.getImageByName = async (req, res) => {
    console.log("requete getImageByName posts");
    const name = req.params.name;
    var reqPath = path.join(__dirname, '../../')
    var file = reqPath + "\\data\\" + name;
    res.download(file); 
};

