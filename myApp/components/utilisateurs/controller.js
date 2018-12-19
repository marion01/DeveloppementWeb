import db from "../../db/db";

exports.get = (req, res) => {
    res.status(200).send({
     posts: db
  })
};

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
