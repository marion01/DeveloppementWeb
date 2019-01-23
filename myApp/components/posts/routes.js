import Posts from "./controller";
import express from "express";
import multer from "multer"
import { verifyJWT_MW } from "../../middleWare/auth.js"
import bodyParser from "body-parser"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../../data/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const data = multer({ storage: storage })
const type = data.single("photo");


const routes = express.Router();

routes.use(bodyParser.json());
routes.all("/", verifyJWT_MW);

routes.route("").get(Posts.get);
routes.route("/:id").get(Posts.getById);
routes.route("/post").post(Posts.post);
routes.route("/update").post(Posts.update);
routes.route("/imageByPostId/:id").get(Posts.getImageByPostId);
routes.route("/imageByName/:name").get(Posts.getImageByName);
routes.route("/getPostsOfAutor/:id").get(Posts.getPostsOfAutor);



export default routes;