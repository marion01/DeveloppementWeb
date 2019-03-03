import mongoose from "mongoose";
import Utilisateur from "./model"
import crypto from "crypto"
import Commentaires from "../commentaires/model"
import Posts from "../posts/model"
import fs from 'fs';

exports.get = async (req, res) => {

    const users = await Utilisateur.find();
    res.status(200).send(users);
};

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

exports.delete = async (req, res) => {
    const id = req.params.id;
    await Posts.find({ "auteur.ref": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            console.log("doc", doc);
            console.log(doc[0]);
            for (var i in doc) {
                console.log(doc[i]);
                let fileName = doc[i].img.rel;
                let filePath = 'data/'
                console.log("delete " + filePath + fileName)
                fs.unlinkSync(filePath + fileName);
            }
        }
    }).remove();

    await Commentaires.find({ "auteur.ref": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        }}).remove();

    await Utilisateur.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send();
    });
};




exports.post = (req, res) => {
    console.log(req.body);
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
   console.log("hashPassword: " + hashPassword);

   const post = {
       nom: req.body.nom,
       prenom: req.body.prenom,
       pseudo: req.body.pseudo,
       mdp: hashPassword,
       mail: req.body.mail
    };
    Utilisateur.create(post);
   return res.status(201).send({ post,success: true });
};

exports.update = async (req, res) => {
    console.log("update ", req.body);
    const old = { _id: new mongoose.Types.ObjectId(req.body.id) }

    var hashPassword = crypto.createHash('sha256').update(req.body.mdp).digest('base64');
    const post = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        mdp: hashPassword
    }
    await Utilisateur.update(old, post);
    return res.status(201).send({ post, success:true });   
};

//get the id of a user thank to his pseudo
exports.getIdFromPseudo = async (req, res) => {
    console.log("getIdFromPseudo")
    const pseudo = req.params.pseudo;
    console.log(pseudo)
    await Utilisateur.findOne({ "pseudo": pseudo }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
    });
};

exports.getPasswordValidity = async (req, res) => {
    console.log(req);
    let pseudo = req.body.pseudo;
    let password = req.body.password;
    //find password saved for the pseudo entered
    Utilisateur.findOne({ "pseudo": pseudo }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            console.log(password);
            //hash the password entered
            var hashPassword = crypto.createHash('sha256').update(password).digest('base64');
            console.log("hashPassword: " + hashPassword);
            console.log(doc);
            //compare the hash to the one saved
            if (doc && hashPassword === doc.mdp) {
                //create token
                res.status(200).json({
                    success: true
                });
            }else {
                //error wrong password
                res.status(200).json({
                    success: false,
                    message: "Mot de passe incorrecte."
                });
            }
        }
    });
};

