import Mongoose from 'mongoose';

/*
 * Model of a post
 */

const Schema = Mongoose.Schema;

var Posts = new Schema({
    // Post author
    auteur: {

        // Author pseudo
        pseudo: String,

        // Author Id
        ref: {
            type: Schema.Types.ObjectId,
            ref: "utilisateurs"
        }
    },

    // Image posts
    img: {
        rel: String
    },

    // Posts message
    texte: String,

    // Date posts
    date: String
}, {
        versionKey: false
    });

let posts = Mongoose.model('posts', Posts);

export default posts;