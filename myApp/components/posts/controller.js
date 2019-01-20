import mongoose from "mongoose";
import Posts from "./model"
import path from "path"

//récupère l'ensemble des posts
exports.get = async (req, res) => {
    console.log("requete get posts");
    const posts = await Posts.find();
    res.status(200).send(posts);
};

//récupère l'ensemble des posts d'un utilisateur
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

//récupère un post avec son id
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

//enregistre un post en base
exports.post = (req, res) => {
    console.log(req.body);
    const post = {
        auteur: req.body.auteur,
        img: req.body.img,
        texte: req.body.texte,
        date: req.body.date
    };
    Posts.create(post);
    return res.status(201).send({ post });
};

//met a jour le post de l'id indiqué dans la requete
exports.update = async (req, res) => {
    console.log(req.body);
    const old = { _id: new mongoose.Types.ObjectId(req.body._id) }
    const post = {
        _id: req.body._id,
        auteur: req.body.auteur,
        img: req.body.img,
        texte: req.body.texte,
        date: req.body.date
    }
    await Posts.update(old, post);
    return res.status(201).send({ post });
};

//récupère l'image d'un post déterminé par son id
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

//récupère une image par son nom
exports.getImageByName = async (req, res) => {
    console.log("requete getImageByName posts");
    const name = req.params.name;
    var reqPath = path.join(__dirname, '../../')
    var file = reqPath + "\\data\\" + name;
    res.download(file); 
};

