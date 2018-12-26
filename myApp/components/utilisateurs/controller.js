import mongoose from "mongoose";

var db = mongoose.connection;

exports.get = (req, res) => {
    res.status(200).send({
     posts: db
  })
};

exports.getById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((utilisateur) => {
        if (utilisateur.id === id)
            return res.status(200).send({ utilisateur})
    })
}

exports.post = (req, res) => {
    const collection = db.collection('utilisateurs');
   console.log(req.body);
   const post = {
       id: collection.length +1,
       nom: req.body.nom,
       prenom: req.body.prenom
    };
    collection.save(post);
   return res.status(201).send({
       post
   });
};
