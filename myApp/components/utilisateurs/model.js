import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

var UtilisateurSchema = new Schema({
    nom: String,
    prenom: String,
    pseudo: String,
    mdp: String,
    mail: String
}, {
    versionKey: false
    });

let utilisateurs = Mongoose.model('utilisateurs', UtilisateurSchema);

export default utilisateurs;