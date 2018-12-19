import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

var UtilisateurSchema = new Schema({
    nom: String,
    prenom: String,
    img: {
        rel: String,
        href: String,
    },
});

UtilisateurSchema.index({name: 1});
let Utlisateurs = Mongoose.model('Utilisateurs', UtilisateurSchema);

export default Utlisateurs;