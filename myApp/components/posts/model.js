import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

var Posts = new Schema({
    auteur: {
        pseudo: String,
        ref: {
            type: Schema.Types.ObjectId,
            ref: "utilisateurs"
        }
    },
    img: {
        rel: String
    },
    texte: String,
    date: String
}, {
        versionKey: false
    });

let posts = Mongoose.model('posts', Posts);

export default posts;