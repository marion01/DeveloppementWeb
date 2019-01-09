import express from "express";
import utilisateurs from "./utilisateurs/routes";
import posts from "./posts/routes";
import commentaires from "./commentaires/routes";

const routes = express.Router();

routes.use("/api/v1/utilisateurs", utilisateurs);
routes.use("/api/v1/posts", posts);
routes.use("/api/v1/commentaires", commentaires);

export default routes;