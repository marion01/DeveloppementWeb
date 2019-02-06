import Utilisateur from "./controller";
import express from "express";
import bodyParser from "body-parser"

const routes = express.Router();

routes.use(bodyParser.json());

routes.route("").get(Utilisateur.get);
routes.route("/:id").get(Utilisateur.getById);
routes.route("/post").post(Utilisateur.post);
routes.route("/update").post(Utilisateur.update);
routes.route("/getIdFromPseudo/:pseudo").get(Utilisateur.getIdFromPseudo);

export default routes;