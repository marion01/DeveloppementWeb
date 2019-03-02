import Commentaires from "./controller";
import express from "express";
import { verifyJWT_MW } from "../../middleWare/auth.js"
import bodyParser from "body-parser"

const routes = express.Router();

routes.use(bodyParser.json());
routes.all("/*", verifyJWT_MW);

routes.route("").get(Commentaires.get);
routes.route("/:id").get(Commentaires.getById);
routes.route("/post").post(Commentaires.post);
routes.route("/update").post(Commentaires.update);
routes.route("/getCommentairesOfPost/:id").get(Commentaires.getCommentairesOfPost);

export default routes;