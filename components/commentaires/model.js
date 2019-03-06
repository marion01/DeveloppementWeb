import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

/*
 * Modell for a comment
 */
var Commentaires = new Schema({

    // Comment message
    commentaire: String,

    // Post Id where the comment is written
    post: {
        type: Schema.Types.ObjectId,
        ref: "posts"
    },

    // Comment author
    auteur: {

        // Author pseudo
        pseudo: String,

        // Author Id
        ref: {
            type: Schema.Types.ObjectId,
            ref: "utilisateurs"
        }
    },

    // Comment Date
    date: String
}
    , {
        versionKey: false
    });

let commentaires = Mongoose.model('commentaires', Commentaires);

export default commentaires;