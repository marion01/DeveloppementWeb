import Utilisateur from "./controller";
import express from "express";
import bodyParser from "body-parser"

/*
 * Routes of users
 */

const routes = express.Router();

routes.use(bodyParser.json());

routes.route("").get(Utilisateur.get);
routes.route("/:id").get(Utilisateur.getById);
routes.route("/:id").delete(Utilisateur.delete);
routes.route("/").post(Utilisateur.post);
routes.route("/").put(Utilisateur.update);
routes.route("/getIdFromPseudo/:pseudo").get(Utilisateur.getIdFromPseudo); 
routes.route("/getPasswordValidity").post(Utilisateur.getPasswordValidity);

export default routes;