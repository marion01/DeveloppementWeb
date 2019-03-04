import Mongoose from 'mongoose';

/*
 * Model of a user
 */

const Schema = Mongoose.Schema;

var UtilisateurSchema = new Schema({
    // Last name of the user
    nom: String,

    // First name of the user
    prenom: String,

    // Pseudo of the user
    pseudo: String,

    // Password hashed of the user
    mdp: String,

    // Mail of the user
    mail: String
}, {
    versionKey: false
    });

let utilisateurs = Mongoose.model('utilisateurs', UtilisateurSchema);

export default utilisateurs;