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
