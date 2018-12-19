import db from "../../db/db";

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
   console.log(req.body);
   const post = {
       id: db.length +1,
       nom: req.body.nom,
       prenom: req.body.prenom
   };
   db.push(post);
   return res.status(201).send({
       post
   });
};
