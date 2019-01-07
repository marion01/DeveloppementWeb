import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

var Commentaires = new Schema({
    commentaire: String,
    post:  {
            type: Schema.types.ObjectId,
            ref: "posts"
    },
    auteur: {
        name: String,
        ref: {
            type: Schema.types.ObjectId,
            ref: "utilisateurs"
        }
    },
});

let commentaires = Mongoose.model('commentaires', Commentaires);

export default commentaires;