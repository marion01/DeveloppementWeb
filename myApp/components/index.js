import express from "express";
import utilisateurs from "./utilisateurs/routes";
import posts from "./posts/routes";
import commentaires from "./commentaires/routes";
import { createJWToken } from "../libs/auth";
import crypto from "crypto"
import Utilisateur from "./utilisateurs/model"
import { verifyJWT_MW } from "../middleWare/auth.js"
import bodyParser from "body-parser"
import allowCrossDomain from "../middleware/node-express-cors-middleware";

const routes = express.Router();
routes.use(allowCrossDomain);

routes.use("/api/v1/utilisateurs", utilisateurs);
routes.use("/api/v1/posts", posts);
routes.use("/api/v1/commentaires", commentaires);

routes.use(bodyParser.json());
routes.all("/api/v1/posts", verifyJWT_MW);

routes.use(bodyParser.urlencoded({ extended: true }));

routes.post("/api/v1/login", (req, res) => {
    let { pseudo, password } = req.body;
    //find password saved for the pseudo entered
    Utilisateur.findOne({ "pseudo": pseudo }, function (err, doc) {
        if (err) {
            throw err;
        } else {
            //hash the password entered
            var hashPassword = crypto.createHash('sha256').update(password).digest('base64');
            console.log("hashPassword: " + hashPassword);
            console.log(doc);
            //compare the hash to the one saved
            if (hashPassword === doc.mdp) {
                //create token
                res.status(200).json({
                    success: true,
                    token: createJWToken({
                        sessionData: { pseudo: doc.pseudo, id: doc._id }
                    })
                });
            } else {
                //error wrong password
                res.status(401).json({
                    message: "Login ou mot de passe incorrecte."
                });
            }
        }
    });
   
});

export default routes;