import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

var Posts = new Schema({
    auteur: {
        name: String,
        ref: {
            type: Schema.Types.ObjectId,
            ref: "utilisateurs"
        }
    },
    img: {
        rel: String,
        href: String,
    },
    texte: String
}, {
        versionKey: false
    });

let posts = Mongoose.model('posts', Posts);

export default posts;