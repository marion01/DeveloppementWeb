import mongoose from "mongoose";
import Utilisateur from "./model"

exports.get = async (req, res) => {

    const users = await Utilisateur.find();
    res.status(200).send(users);
};

exports.getById = async (req, res) => {
    //id = string
    const id = req.params.id;
    await Utilisateur.findOne({ "_id": new mongoose.Types.ObjectId(id) }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            res.status(200).send({ doc });
        }
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
   const post = {
       nom: req.body.nom,
       prenom: req.body.prenom,
       pseudo: req.body.pseudo,
       mdp: req.body.mdp
    };
    Utilisateur.create(post);
   return res.status(201).send({ post });
};

exports.update = async (req, res) => {
    console.log(req.body);
    const old = { _id: new mongoose.Types.ObjectId(req.body._id) }
    const post = {
            _id: req.body._id,
            nom: req.body.nom,
            prenom: req.body.prenom,
            pseudo: req.body.pseudo,
            mdp: req.body.mdp
    }
    await Utilisateur.update(old, post);
    return res.status(201).send({ post });   
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
