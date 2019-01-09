import Posts from "./controller";
import express from "express";

const routes = express.Router();

routes.route("").get(Posts.get);
routes.route("/:id").get(Posts.getById);
routes.route("/post").post(Posts.post);
routes.route("/update").post(Posts.update);

export default routes;