import mongoose from "mongoose";
import Posts from "./model"
import path from "path"
import Commentaires from "../commentaires/model"
import fs from 'fs';


/*
 * Controller for posts 
 */


/*
 * Get all posts 
 */
exports.get = async (req, res) => {
    const posts = await Posts.find();
    res.status(200).send(posts);
};

/*
 * Count the number of total post
 */
exports.count = async (req, res) => {
    const count = await Posts.find().estimatedDocumentCount();
    res.status(200).send({ count });
}

/*
 * Count number of post of a user
 */
exports.countForUser = async (req, res) => {
    const id = req.params.id;
    const count = await Posts.find({ "auteur.ref": new mongoose.Types.ObjectId(id) }).countDocuments();
    res.status(200).send({ count });
}

/*
 * Get all posts of an user by its id
 */
exports.getPostsOfAutor = async (req, res) => {
    const id = req.params.id;
    await Posts.find({ "auteur.ref": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};

/*
 * Get a post by its id
 */
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

/*
 * Save a new post
 */
exports.post = (req, res) => {
    if (!req.body.auteur) {
        return res.status(400).send({
            message: "author is required"
        })
    }
    if (!req.body.img) {
        return res.status(400).send({
            message: "image is required"
        })
    }
    if (!req.body.texte) {
        return res.status(400).send({
            message: "text is required"
        })
    }
    if (!req.body.date) {
        return res.status(400).send({
            message: "date is required"
        })
    }
    const post = {
        auteur: req.body.auteur,
        img: req.body.img,
        texte: req.body.texte,
        date: req.body.date
    };
    Posts.create(post);
    return res.status(201).send({ post });
};

/*
 * Update post by its id
 */
exports.update = async (req, res) => {
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

/*
 * Get image of a post by posts id
 */
exports.getImageByPostId = async (req, res) => {
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

/*
 * Get a image by its name
 */
exports.getImageByName = async (req, res) => {
    const name = req.params.name;
    var reqPath = path.join(__dirname, '../../')
    var file = reqPath + "\\data\\" + name;
    res.download(file); 
};

/*
 * Save a new image 
 */
exports.postImg = (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            message: "image is required"
        })
    }
    res.status(200).json(req.file);
};

/*
 * Delete a post and the commentary associated
 */
exports.delete = async (req, res) => {
    try {
        // Delete all commentary of the post
        const id = req.params.id;
        let success = await Commentaires.deleteMany({ "post": new mongoose.Types.ObjectId(id) })
           
        if (success) {
            // Delete post
            let success2 = await Posts.deleteOne({ "_id": new mongoose.Types.ObjectId(id) }, )
            if (success2) {
                return res.status(201).send()
            }           
        } 
    } catch (err) { 
        console.log(err)
    }
}

/*
 * Delete image
 */
exports.deleteImg = async (req, res) => {
    let fileName = req.params.file;
    let filePath = 'data/'
    fs.unlinkSync(filePath+fileName);
    return res.status(201).send()
}

/*
 * Get posts by page
 */
exports.getByPage = async (req, res) => {
    let page = req.query.page;
    let per_page = req.query.per_page;
    var start = (parseInt(page) - 1) * parseInt(per_page);
    let result = await Posts.find({}).sort({date: -1})
        .skip(start)
        .limit(parseInt(per_page));
    return res.status(201).send({result})
}

/*
 * Get posts of a user by page
 */
exports.getByPageForUser = async (req, res) => {
    let page = req.query.page;
    const id = req.params.id;
    let per_page = req.query.per_page;
    var start = (parseInt(page) - 1) * parseInt(per_page);
    let result = await Posts.find({ "auteur.ref": new mongoose.Types.ObjectId(id) })
        .sort({ date: -1 })
        .skip(start)
        .limit(parseInt(per_page));
    return res.status(201).send({ result })
}