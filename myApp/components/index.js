import express from "express";
import utilisateurs from "./utilisateurs/routes";
import posts from "./posts/routes";
import commentaires from "./commentaires/routes";
import bodyParser from "body-parser";
import { createJWToken } from "../libs/auth";


const routes = express.Router();

routes.use("/api/v1/utilisateurs", utilisateurs);
routes.use("/api/v1/posts", posts);

routes.use("/api/v1/commentaires", commentaires);

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

routes.post("/api/v1/login", (req, res) => {
    let { email, password } = req.body;
    if (email === "toto" && password === "toto") {
        res.status(200).json({
            success: true,
            token: createJWToken({
                sessionData: { name: "toto", age: 15 },
                maxAge: 3600
            })
        });
    } else {
        res.status(401).json({
            message: "Login ou mot de passe incorrecte."
        });
    }
});

routes.get("/", (req, res) => {
    res.status(200).json({ message: "Connected!" });
});

export default routes;