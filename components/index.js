import express from "express";
import utilisateurs from "./utilisateurs/routes";
import posts from "./posts/routes";
import commentaires from "./commentaires/routes";
import { createJWToken } from "../libs/auth";
import crypto from "crypto"
import Utilisateur from "./utilisateurs/model"
import { verifyJWT_MW } from "../middleWare/auth.js"
import bodyParser from "body-parser"
import allowCrossDomain from "../middleWare/node-express-cors-middleware.js";

/*
 * Entry point of the API
 */

/*
 * Routes
 */
const routes = express.Router();
routes.use(allowCrossDomain);

routes.use("/api/v1/utilisateurs", utilisateurs);
routes.use("/api/v1/posts", posts);
routes.use("/api/v1/commentaires", commentaires);

routes.use(bodyParser.json());
routes.all("/api/v1/posts", verifyJWT_MW);

routes.use(bodyParser.urlencoded({ extended: true }));

/*
 * Login a user
 */
routes.post("/api/v1/login", (req, res) => {
    let { pseudo, password } = req.body;

    // Find password saved for the pseudo entered
    Utilisateur.findOne({ "pseudo": pseudo }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            // Hash the password entered
            var hashPassword = crypto.createHash('sha256').update(password).digest('base64');

            // Compare the hash to the one saved
            if (doc && hashPassword === doc.mdp) {

                // Create token
                res.status(200).json({
                    success: true,
                    token: createJWToken({
                        sessionData: { pseudo: doc.pseudo, id: doc._id }
                    })
                });
            } else {
                //Error wrong password
                res.status(401).json({
                    message: "Login ou mot de passe incorrecte."
                });
            }
        }
    });
   
});

/*
 * Get all pseudo correpsonding to a specified pseudo
 * To check that a new pseudo is not already taken
 */
routes.get("/api/v1/searchPseudo/:pseudo", (req, res) => {
    var pseudoToSearch = req.params.pseudo;
    Utilisateur.find({},'pseudo', function (err, list) {
        if (err) {
            throw err;
        } else {
            var doc = list.filter(p => p.pseudo.toLowerCase() == pseudoToSearch.toLowerCase()).length;
            res.status(200).send({ doc });
        }
    });
});
export default routes;