import Utilisateur from "./controller";
import express from "express";

const routes = express.Router();

routes.route("/getAll").get(Utilisateur.get);
routes.route("/post").post(Utilisateur.post);

export default routes;