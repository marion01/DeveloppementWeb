import Utilisateur from "./controller";
import express from "express";

const routes = express.Router();

routes.route("").get(Utilisateur.get);
routes.route("/:id").get(Utilisateur.getById);
routes.route("/post").post(Utilisateur.post);
routes.route("/update").post(Utilisateur.update);

export default routes;