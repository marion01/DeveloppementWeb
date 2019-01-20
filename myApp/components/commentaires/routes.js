import Commentaires from "./controller";
import express from "express";

const routes = express.Router();

routes.route("").get(Commentaires.get);
routes.route("/:id").get(Commentaires.getById);
routes.route("/post").post(Commentaires.post);
routes.route("/update").post(Commentaires.update);
routes.route("/getCommentairesOfPost/:id").get(Commentaires.getCommentairesOfPost);

export default routes;