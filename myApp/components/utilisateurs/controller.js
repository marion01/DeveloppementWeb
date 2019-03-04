import mongoose from "mongoose";
import Utilisateur from "./model"
import crypto from "crypto"
import Commentaires from "../commentaires/model"
import Posts from "../posts/model"
import fs from 'fs';


/*
 * Controller of posts
 */


/*
 * Get all users
 */
exports.get = async (req, res) => {
    const users = await Utilisateur.find();
    res.status(200).send(users);
};

/*
 * Get a user by its id
 */
exports.getById = async (req, res) => {
    const id = req.params.id;
    await Utilisateur.findOne({ "_id": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};

/*
 * Delete a user and its data by its id
 */
exports.delete = async (req, res) => {
    const id = req.params.id;

    // Delete pitcure and posts
    await Posts.find({ "auteur.ref": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            for (var i in doc) {
                let fileName = doc[i].img.rel;
                let filePath = 'data/'
                fs.unlinkSync(filePath + fileName);
            }
        }
    }).remove();

    // Delete comments
    await Commentaires.find({ "auteur.ref": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        }
    }).remove();

    await Utilisateur.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send();
    });
};

/*
 * Create a new post
 */
exports.post = (req, res) => {
    if (!req.body.nom) {
        return res.status(400).send({
            message: "name is required"
        })
    }
    if (!req.body.prenom) {
        return res.status(400).send({
            message: "first name is required"
        })
    }
    if (!req.body.pseudo) {
        return res.status(400).send({
            message: "pseudo is required"
        })
    }
    if (!req.body.mdp) {
        return res.status(400).send({
            message: "mdp is required"
        })
    }
    if (!req.body.mail) {
        return res.status(400).send({
            message: "mail is required"
        })
    }
    var hashPassword = crypto.createHash('sha256').update(req.body.mdp).digest('base64');

    const post = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        mdp: hashPassword,
        mail: req.body.mail
    };
    Utilisateur.create(post);
    return res.status(201).send({ post, success: true });
};

/*
 * Update a post
 */
exports.update = async (req, res) => {
    const old = { _id: new mongoose.Types.ObjectId(req.body.id) }

    var hashPassword = crypto.createHash('sha256').update(req.body.mdp).digest('base64');
    const post = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        mdp: hashPassword
    }
    await Utilisateur.update(old, post);
    return res.status(201).send({ post, success: true });
};

/*
 * Get the id of a user by his pseudo
 */
exports.getIdFromPseudo = async (req, res) => {
    const pseudo = req.params.pseudo;
    await Utilisateur.findOne({ "pseudo": pseudo }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};

/*
 * Check the validity of a password
 */
exports.getPasswordValidity = async (req, res) => {
    let pseudo = req.body.pseudo;
    let password = req.body.password;

    // Find password saved for the pseudo entered
    Utilisateur.findOne({ "pseudo": pseudo }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            // Hash the password entered
            var hashPassword = crypto.createHash('sha256').update(password).digest('base64');

            // Compare the hash to the one saved
            if (doc && hashPassword === doc.mdp) {
                // Create token
                res.status(200).json({
                    success: true
                });
            } else {
                // Error wrong password
                res.status(200).json({
                    success: false,
                    message: "Mot de passe incorrect"
                });
            }
        }
    });
};

