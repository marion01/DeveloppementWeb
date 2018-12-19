import Utilisateur from "./controller";
import express from "express";

const routes = express.Router();

routes.route("").get(Utilisateur.get);
routes.route("/:id").get(Utilisateur.getById);
routes.route("/post").post(Utilisateur.post);

export default routes;