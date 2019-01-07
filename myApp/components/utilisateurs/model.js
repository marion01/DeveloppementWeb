import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

var UtilisateurSchema = new Schema({
    nom: String,
    prenom: String,
    pseudo: String,
    mdp: String
});

let utilisateurs = Mongoose.model('utilisateurs', UtilisateurSchema);

export default utilisateurs;