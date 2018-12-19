import express from "express";
import utilisateurs from "./utilisateurs/routes";

const routes = express.Router();

routes.use("/api/v1/utilisateurs", utilisateurs);

export default routes;