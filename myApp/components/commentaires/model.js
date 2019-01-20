import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

var Commentaires = new Schema({
    commentaire: String,
    post:  {
            type: Schema.Types.ObjectId,
            ref: "posts"
    },
    auteur: {
        pseudo: String,
        ref: {
            type: Schema.Types.ObjectId,
            ref: "utilisateurs"
        }
    },
    date: String
}, {
        versionKey: false
    });

let commentaires = Mongoose.model('commentaires', Commentaires);

export default commentaires;